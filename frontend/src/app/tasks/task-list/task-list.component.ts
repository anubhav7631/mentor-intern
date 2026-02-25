import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TaskService } from '../../core/services/task.service';
import { AuthService } from '../../core/services/auth.service';
import { Task } from '../../core/models/models';

@Component({
    selector: 'app-task-list',
    standalone: true,
    imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule, MatChipsModule,
        MatProgressSpinnerModule, MatSnackBarModule],
    template: `
    <div class="page-container">
      <div class="page-header">
        <div class="header-row">
          <div>
            <h1>Task Management</h1>
            <p>Create, assign, and track tasks for interns</p>
          </div>
          <a *ngIf="auth.isMentor" routerLink="/tasks/create" class="btn-primary create-btn">
            <mat-icon>add</mat-icon> Create Task
          </a>
        </div>
      </div>

      <div *ngIf="loading" class="loading-state"><mat-spinner diameter="40"></mat-spinner></div>

      <div *ngIf="!loading" class="task-grid">
        <div *ngFor="let task of tasks" class="task-card" (click)="viewTask(task)">
          <div class="task-header">
            <div class="task-type-badge" [ngClass]="'type-' + task.taskType?.toLowerCase()">{{ task.taskType }}</div>
            <span class="status-badge" [ngClass]="'priority-' + task.priority?.toLowerCase()">{{ task.priority }}</span>
          </div>

          <h3 class="task-title">{{ task.title }}</h3>
          <p class="task-desc">{{ task.description | slice:0:100 }}{{ task.description?.length! > 100 ? '...' : '' }}</p>

          <div class="task-meta">
            <div class="meta-item">
              <mat-icon>calendar_today</mat-icon>
              <span>Due: {{ task.dueDate | date:'MMM d, y' }}</span>
            </div>
            <div class="meta-item">
              <mat-icon>person</mat-icon>
              <span>{{ task.createdByName }}</span>
            </div>
          </div>

          <div class="task-progress">
            <div class="progress-info">
              <span>{{ task.completedCount }} / {{ task.totalAssigned }} completed</span>
              <span *ngIf="task.overdueCount! > 0" class="text-danger">{{ task.overdueCount }} overdue</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill"
                   [style.width.%]="task.totalAssigned! > 0 ? (task.completedCount! / task.totalAssigned! * 100) : 0"></div>
            </div>
          </div>

          <div class="task-actions" *ngIf="auth.isMentor">
            <button mat-icon-button (click)="deleteTask(task); $event.stopPropagation()" color="warn">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        </div>

        <div *ngIf="tasks.length === 0" class="empty-card">
          <mat-icon>assignment</mat-icon>
          <p>No tasks created yet</p>
          <a *ngIf="auth.isMentor" routerLink="/tasks/create" class="btn-primary" style="margin-top: 16px;">Create First Task</a>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .header-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap; }
    .create-btn { display: inline-flex; align-items: center; gap: 6px; text-decoration: none; }
    .loading-state { display: flex; justify-content: center; padding: 60px; }

    .task-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 20px;
    }

    .task-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 20px;
      cursor: pointer;
      transition: all 0.2s;
      position: relative;
    }
    .task-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); border-color: var(--primary); }

    .task-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }

    .task-type-badge {
      font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
      padding: 4px 10px; border-radius: 4px;
    }
    .type-daily { background: rgba(14, 165, 233, 0.15); color: #38bdf8; }
    .type-weekly { background: rgba(168, 85, 247, 0.15); color: #c084fc; }
    .type-project { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
    .type-assignment { background: rgba(16, 185, 129, 0.15); color: #34d399; }

    .task-title { font-size: 16px; font-weight: 700; margin-bottom: 6px; }
    .task-desc { color: var(--text-secondary); font-size: 13px; margin-bottom: 16px; line-height: 1.5; }

    .task-meta { display: flex; gap: 16px; margin-bottom: 16px; }
    .meta-item { display: flex; align-items: center; gap: 4px; color: var(--text-muted); font-size: 12px; }
    .meta-item mat-icon { font-size: 14px; width: 14px; height: 14px; }

    .task-progress { }
    .progress-info { display: flex; justify-content: space-between; font-size: 12px; color: var(--text-secondary); margin-bottom: 6px; }
    .progress-track { height: 4px; background: var(--bg-surface); border-radius: 2px; }
    .progress-fill { height: 100%; background: linear-gradient(90deg, var(--primary), var(--success)); border-radius: 2px; transition: width 0.5s; }

    .text-danger { color: #f87171; font-weight: 600; }

    .task-actions { position: absolute; top: 8px; right: 8px; opacity: 0; transition: opacity 0.2s; }
    .task-card:hover .task-actions { opacity: 1; }

    .empty-card {
      background: var(--bg-card); border: 1px dashed var(--border); border-radius: var(--radius);
      padding: 60px; text-align: center; color: var(--text-muted);
      grid-column: 1 / -1;
    }
    .empty-card mat-icon { font-size: 48px; width: 48px; height: 48px; margin-bottom: 8px; }
  `]
})
export class TaskListComponent implements OnInit {
    tasks: Task[] = [];
    loading = true;

    constructor(
        private taskService: TaskService,
        public auth: AuthService,
        private router: Router,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.loadTasks();
    }

    loadTasks(): void {
        this.loading = true;
        this.taskService.getAll().subscribe(t => {
            this.tasks = t;
            this.loading = false;
        });
    }

    viewTask(task: Task): void {
        this.router.navigate(['/tasks', task.id]);
    }

    deleteTask(task: Task): void {
        if (confirm(`Delete task "${task.title}"?`)) {
            this.taskService.delete(task.id!).subscribe(() => {
                this.snackBar.open('Task deleted', 'Close', { duration: 2000 });
                this.loadTasks();
            });
        }
    }
}
