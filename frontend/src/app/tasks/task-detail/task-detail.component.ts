import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TaskService } from '../../core/services/task.service';
import { AuthService } from '../../core/services/auth.service';
import { Task, TaskAssignment } from '../../core/models/models';

@Component({
    selector: 'app-task-detail',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink, MatButtonModule, MatIconModule,
        MatSnackBarModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule],
    template: `
    <div class="page-container" *ngIf="task">
      <div class="page-header">
        <a routerLink="/tasks" class="back-link"><mat-icon>arrow_back</mat-icon> Back to Tasks</a>
        <div class="header-row">
          <div>
            <div class="header-badges">
              <span class="type-badge" [ngClass]="'type-' + task.taskType?.toLowerCase()">{{ task.taskType }}</span>
              <span class="status-badge" [ngClass]="'priority-' + task.priority?.toLowerCase()">{{ task.priority }}</span>
            </div>
            <h1>{{ task.title }}</h1>
            <p>{{ task.description }}</p>
          </div>
          <div *ngIf="auth.isMentor" class="header-actions">
            <button class="btn-primary" (click)="completeAll()">
              <mat-icon>check_circle</mat-icon> Mark All Complete
            </button>
          </div>
        </div>
      </div>

      <!-- Task Info -->
      <div class="card-grid card-grid-4" style="margin-bottom: 24px;">
        <div class="stat-card">
          <div class="stat-value">{{ task.totalAssigned }}</div>
          <div class="stat-label">Total Assigned</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color: #34d399;">{{ task.completedCount }}</div>
          <div class="stat-label">Completed</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color: #fbbf24;">{{ task.pendingCount }}</div>
          <div class="stat-label">Pending</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color: #f87171;">{{ task.overdueCount }}</div>
          <div class="stat-label">Overdue</div>
        </div>
      </div>

      <!-- Assignments Table -->
      <div class="data-table-container">
        <table class="performance-table">
          <thead>
            <tr>
              <th>Intern</th>
              <th>Intern ID</th>
              <th>Status</th>
              <th>Assigned</th>
              <th>Completed</th>
              <th>Score</th>
              <th>Remarks</th>
              <th *ngIf="auth.isMentor">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let a of task.assignments">
              <td class="fw-600">{{ a.internName }}</td>
              <td>{{ a.internInternId }}</td>
              <td><span class="status-badge" [ngClass]="'status-' + a.status?.toLowerCase()">{{ a.status?.replace('_', ' ') }}</span></td>
              <td>{{ a.assignedDate | date:'mediumDate' }}</td>
              <td>{{ a.completionDate ? (a.completionDate | date:'mediumDate') : '-' }}</td>
              <td>{{ a.score || '-' }}</td>
              <td>{{ a.remarks || '-' }}</td>
              <td *ngIf="auth.isMentor">
                <button *ngIf="a.status !== 'COMPLETED'" mat-icon-button color="primary"
                        (click)="openComplete(a)" title="Mark Complete">
                  <mat-icon>check</mat-icon>
                </button>
              </td>
            </tr>
            <tr *ngIf="!task.assignments?.length">
              <td [attr.colspan]="auth.isMentor ? 8 : 7" style="text-align: center; padding: 30px; color: var(--text-muted);">
                No assignments yet
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Complete Dialog Inline -->
      <div *ngIf="completingAssignment" class="complete-dialog-overlay" (click)="completingAssignment = null">
        <div class="complete-dialog" (click)="$event.stopPropagation()">
          <h3>Complete Assignment</h3>
          <p>For: <strong>{{ completingAssignment.internName }}</strong></p>
          <mat-form-field appearance="outline">
            <mat-label>Remarks</mat-label>
            <textarea matInput [(ngModel)]="completeRemarks" rows="3"></textarea>
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Score (0-100)</mat-label>
            <input matInput type="number" [(ngModel)]="completeScore" min="0" max="100">
          </mat-form-field>
          <div class="dialog-actions">
            <button mat-button (click)="completingAssignment = null">Cancel</button>
            <button class="btn-primary" (click)="submitComplete()">Mark Complete</button>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .back-link { display: inline-flex; align-items: center; gap: 4px; color: var(--text-secondary); text-decoration: none; margin-bottom: 12px; }
    .back-link:hover { color: var(--primary-light); }
    .header-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap; }
    .header-badges { display: flex; gap: 8px; margin-bottom: 8px; }
    .header-actions button { display: inline-flex; align-items: center; gap: 6px; }

    .type-badge { font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 10px; border-radius: 4px; }
    .type-daily { background: rgba(14, 165, 233, 0.15); color: #38bdf8; }
    .type-weekly { background: rgba(168, 85, 247, 0.15); color: #c084fc; }
    .type-project { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
    .type-assignment { background: rgba(16, 185, 129, 0.15); color: #34d399; }

    .performance-table { width: 100%; border-collapse: collapse; }
    .performance-table th { text-align: left; padding: 14px 16px; color: var(--text-secondary); font-weight: 600; font-size: 12px; text-transform: uppercase; border-bottom: 1px solid var(--border); }
    .performance-table td { padding: 14px 16px; border-bottom: 1px solid var(--border); font-size: 14px; }
    .performance-table tr:hover { background: var(--bg-surface); }
    .fw-600 { font-weight: 600; }

    .complete-dialog-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.6); display: flex;
      align-items: center; justify-content: center; z-index: 1000;
    }
    .complete-dialog {
      background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius);
      padding: 24px; width: 400px; max-width: 90vw;
    }
    .complete-dialog h3 { margin-bottom: 8px; }
    .complete-dialog p { color: var(--text-secondary); margin-bottom: 16px; }
    .dialog-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 16px; }
  `]
})
export class TaskDetailComponent implements OnInit {
    task: Task | null = null;
    completingAssignment: TaskAssignment | null = null;
    completeRemarks = '';
    completeScore: number | null = null;

    constructor(
        private route: ActivatedRoute,
        private taskService: TaskService,
        public auth: AuthService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.loadTask();
    }

    loadTask(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.taskService.getById(id).subscribe(t => this.task = t);
    }

    openComplete(a: TaskAssignment): void {
        this.completingAssignment = a;
        this.completeRemarks = '';
        this.completeScore = null;
    }

    submitComplete(): void {
        if (!this.completingAssignment) return;
        this.taskService.completeAssignment(
            this.completingAssignment.id, this.completeRemarks, this.completeScore!
        ).subscribe(() => {
            this.snackBar.open('Assignment marked complete', 'Close', { duration: 2000 });
            this.completingAssignment = null;
            this.loadTask();
        });
    }

    completeAll(): void {
        if (!this.task || !confirm('Mark all assignments as complete?')) return;
        this.taskService.completeAll(this.task.id!, '', null!).subscribe(() => {
            this.snackBar.open('All assignments marked complete', 'Close', { duration: 2000 });
            this.loadTask();
        });
    }
}
