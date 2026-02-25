import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TaskService } from '../core/services/task.service';
import { AuthService } from '../core/services/auth.service';
import { TaskAssignment } from '../core/models/models';

@Component({
    selector: 'app-intern-tasks',
    standalone: true,
    imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule, MatSelectModule,
        MatFormFieldModule, MatSnackBarModule, MatProgressSpinnerModule],
    template: `
    <div class="page-container">
      <div class="page-header">
        <h1>My Tasks</h1>
        <p>View and update the status of tasks assigned to you</p>
      </div>

      <div *ngIf="loading" class="loading-state"><mat-spinner diameter="40"></mat-spinner></div>

      <div *ngIf="!loading">
        <!-- Stat cards -->
        <div class="card-grid card-grid-4" style="margin-bottom: 24px;">
          <div class="stat-card">
            <div class="stat-icon" style="background: rgba(99, 102, 241, 0.15); color: #818cf8;"><mat-icon>assignment</mat-icon></div>
            <div class="stat-value">{{ assignments.length }}</div>
            <div class="stat-label">Total Assigned</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background: rgba(16, 185, 129, 0.15); color: #34d399;"><mat-icon>check_circle</mat-icon></div>
            <div class="stat-value">{{ countByStatus('COMPLETED') }}</div>
            <div class="stat-label">Completed</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background: rgba(14, 165, 233, 0.15); color: #38bdf8;"><mat-icon>hourglass_empty</mat-icon></div>
            <div class="stat-value">{{ countByStatus('IN_PROGRESS') }}</div>
            <div class="stat-label">In Progress</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background: rgba(239, 68, 68, 0.15); color: #f87171;"><mat-icon>warning</mat-icon></div>
            <div class="stat-value">{{ countByStatus('OVERDUE') }}</div>
            <div class="stat-label">Overdue</div>
          </div>
        </div>

        <!-- Task cards -->
        <div class="task-list">
          <div *ngFor="let a of assignments" class="task-item">
            <div class="task-left">
              <div class="task-info">
                <h3>{{ a.taskTitle }}</h3>
                <div class="task-meta">
                  <span><mat-icon>calendar_today</mat-icon> Assigned: {{ a.assignedDate | date:'mediumDate' }}</span>
                  <span *ngIf="a.completionDate"><mat-icon>check</mat-icon> Completed: {{ a.completionDate | date:'mediumDate' }}</span>
                </div>
              </div>
            </div>
            <div class="task-right">
              <span *ngIf="a.score" class="score-badge">Score: {{ a.score }}</span>
              <span class="status-badge" [ngClass]="'status-' + a.status?.toLowerCase()">{{ a.status?.replace('_', ' ') }}</span>
              <mat-form-field *ngIf="a.status !== 'COMPLETED'" appearance="outline" class="status-select">
                <mat-select [value]="a.status" (selectionChange)="updateStatus(a, $event.value)">
                  <mat-option value="NOT_STARTED">Not Started</mat-option>
                  <mat-option value="IN_PROGRESS">In Progress</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
          </div>

          <div *ngIf="assignments.length === 0" class="empty-state">
            <mat-icon>inbox</mat-icon>
            <p>No tasks assigned to you yet</p>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .loading-state { display: flex; justify-content: center; padding: 60px; }

    .task-list { display: flex; flex-direction: column; gap: 12px; }

    .task-item {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      transition: border-color 0.2s;
    }
    .task-item:hover { border-color: var(--primary); }

    .task-info h3 { font-size: 16px; font-weight: 700; margin-bottom: 6px; }
    .task-meta { display: flex; gap: 16px; flex-wrap: wrap; }
    .task-meta span { display: flex; align-items: center; gap: 4px; color: var(--text-muted); font-size: 12px; }
    .task-meta mat-icon { font-size: 14px; width: 14px; height: 14px; }

    .task-right { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }

    .score-badge {
      background: rgba(99, 102, 241, 0.15);
      color: #818cf8;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }

    .status-select { width: 160px; }

    .empty-state { text-align: center; padding: 60px; color: var(--text-muted); }
    .empty-state mat-icon { font-size: 48px; width: 48px; height: 48px; margin-bottom: 8px; }
  `]
})
export class InternTasksComponent implements OnInit {
    assignments: TaskAssignment[] = [];
    loading = true;

    constructor(
        private taskService: TaskService,
        private auth: AuthService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.loadTasks();
    }

    loadTasks(): void {
        this.loading = true;
        // Use getAllTasks and filter for the current user, or use my-tasks endpoint
        this.taskService.getMyTasks().subscribe({
            next: (tasks) => {
                // Flatten assignments from tasks that belong to this intern
                this.assignments = [];
                // If my-tasks returns TaskAssignment[], use directly
                // Adapt based on backend response
                this.loading = false;
            },
            error: () => {
                // Fallback: try getting by intern id from user profile
                this.loading = false;
            }
        });
    }

    countByStatus(status: string): number {
        return this.assignments.filter(a => a.status === status).length;
    }

    updateStatus(a: TaskAssignment, status: string): void {
        this.taskService.updateAssignmentStatus(a.id, status).subscribe({
            next: (updated) => {
                a.status = updated.status;
                this.snackBar.open('Status updated', 'Close', { duration: 2000 });
            },
            error: () => {
                this.snackBar.open('Failed to update status', 'Close', { duration: 3000 });
            }
        });
    }
}
