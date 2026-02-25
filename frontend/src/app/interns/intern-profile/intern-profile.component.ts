import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InternService } from '../../core/services/intern.service';
import { TaskService } from '../../core/services/task.service';
import { Intern, TaskAssignment } from '../../core/models/models';

@Component({
    selector: 'app-intern-profile',
    standalone: true,
    imports: [CommonModule, RouterLink, MatCardModule, MatIconModule, MatButtonModule,
        MatChipsModule, MatProgressSpinnerModule],
    template: `
    <div class="page-container" *ngIf="intern">
      <div class="page-header">
        <a routerLink="/interns" class="back-link"><mat-icon>arrow_back</mat-icon> Back to Interns</a>
        <h1>{{ intern.name }}</h1>
      </div>

      <!-- Profile Info -->
      <div class="card-grid card-grid-2">
        <div class="profile-card">
          <div class="profile-header">
            <div class="profile-avatar">{{ intern.name?.charAt(0) }}</div>
            <div>
              <h2>{{ intern.name }}</h2>
              <span class="status-badge" [ngClass]="'status-' + intern.status?.toLowerCase()">{{ intern.status }}</span>
            </div>
          </div>

          <div class="profile-details">
            <div class="detail-row"><mat-icon>badge</mat-icon><span>{{ intern.internId }}</span></div>
            <div class="detail-row"><mat-icon>email</mat-icon><span>{{ intern.email }}</span></div>
            <div class="detail-row"><mat-icon>phone</mat-icon><span>{{ intern.phone || '-' }}</span></div>
            <div class="detail-row"><mat-icon>school</mat-icon><span>{{ intern.college || '-' }}</span></div>
            <div class="detail-row"><mat-icon>domain</mat-icon><span>{{ intern.department || '-' }}</span></div>
            <div class="detail-row"><mat-icon>date_range</mat-icon>
              <span>{{ intern.startDate | date:'mediumDate' }} - {{ intern.endDate | date:'mediumDate' }}</span>
            </div>
          </div>
        </div>

        <div class="stats-card">
          <h3 class="section-title">Performance Summary</h3>
          <div class="card-grid card-grid-2" style="gap: 12px;">
            <div class="mini-stat"><div class="mini-val">{{ intern.totalTasks }}</div><div class="mini-label">Total Tasks</div></div>
            <div class="mini-stat"><div class="mini-val text-success">{{ intern.completedTasks }}</div><div class="mini-label">Completed</div></div>
            <div class="mini-stat"><div class="mini-val text-primary">{{ intern.completionPercentage }}%</div><div class="mini-label">Completion</div></div>
            <div class="mini-stat"><div class="mini-val text-warning">{{ intern.totalTasks! - intern.completedTasks! }}</div><div class="mini-label">Remaining</div></div>
          </div>
          <div class="big-progress">
            <div class="big-progress-bar" [style.width.%]="intern.completionPercentage"></div>
          </div>
        </div>
      </div>

      <!-- Task Assignments -->
      <div class="section" style="margin-top: 24px;">
        <h3 class="section-title">Assigned Tasks</h3>
        <div class="data-table-container">
          <table class="performance-table">
            <thead>
              <tr><th>Task</th><th>Status</th><th>Assigned</th><th>Completed</th><th>Score</th><th>Remarks</th></tr>
            </thead>
            <tbody>
              <tr *ngFor="let a of assignments">
                <td class="fw-600">{{ a.taskTitle }}</td>
                <td><span class="status-badge" [ngClass]="'status-' + a.status?.toLowerCase()">{{ a.status?.replace('_', ' ') }}</span></td>
                <td>{{ a.assignedDate | date:'mediumDate' }}</td>
                <td>{{ a.completionDate ? (a.completionDate | date:'mediumDate') : '-' }}</td>
                <td>{{ a.score || '-' }}</td>
                <td>{{ a.remarks || '-' }}</td>
              </tr>
              <tr *ngIf="assignments.length === 0">
                <td colspan="6" style="text-align: center; padding: 30px; color: var(--text-muted);">No tasks assigned yet</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .back-link { display: inline-flex; align-items: center; gap: 4px; color: var(--text-secondary); text-decoration: none; margin-bottom: 12px; font-size: 14px; }
    .back-link:hover { color: var(--primary-light); }

    .profile-card, .stats-card {
      background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px;
    }
    .profile-header { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
    .profile-avatar {
      width: 64px; height: 64px; border-radius: 50%;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      display: flex; align-items: center; justify-content: center;
      font-size: 28px; font-weight: 800; color: white;
    }
    .profile-header h2 { font-size: 22px; font-weight: 700; }

    .profile-details { display: flex; flex-direction: column; gap: 12px; }
    .detail-row { display: flex; align-items: center; gap: 12px; color: var(--text-secondary); }
    .detail-row mat-icon { font-size: 18px; width: 18px; height: 18px; color: var(--text-muted); }

    .mini-stat { background: var(--bg-surface); border-radius: var(--radius-sm); padding: 16px; text-align: center; }
    .mini-val { font-size: 24px; font-weight: 800; }
    .mini-label { font-size: 11px; color: var(--text-muted); margin-top: 4px; text-transform: uppercase; letter-spacing: 0.5px; }

    .text-success { color: #34d399; }
    .text-primary { color: var(--primary-light); }
    .text-warning { color: #fbbf24; }

    .big-progress { height: 8px; background: var(--bg-surface); border-radius: 4px; margin-top: 16px; }
    .big-progress-bar { height: 100%; background: linear-gradient(90deg, var(--primary), var(--secondary)); border-radius: 4px; transition: width 0.5s; }

    .performance-table { width: 100%; border-collapse: collapse; }
    .performance-table th { text-align: left; padding: 14px 16px; color: var(--text-secondary); font-weight: 600; font-size: 12px; text-transform: uppercase; border-bottom: 1px solid var(--border); }
    .performance-table td { padding: 14px 16px; border-bottom: 1px solid var(--border); font-size: 14px; }
    .fw-600 { font-weight: 600; }
  `]
})
export class InternProfileComponent implements OnInit {
    intern: Intern | null = null;
    assignments: TaskAssignment[] = [];

    constructor(
        private route: ActivatedRoute,
        private internService: InternService,
        private taskService: TaskService
    ) { }

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.internService.getById(id).subscribe(i => this.intern = i);
        this.taskService.getInternAssignments(id).subscribe(a => this.assignments = a);
    }
}
