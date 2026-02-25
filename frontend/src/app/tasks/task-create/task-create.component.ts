import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TaskService } from '../../core/services/task.service';
import { InternService } from '../../core/services/intern.service';
import { AuthService } from '../../core/services/auth.service';
import { Intern, TaskCreateRequest } from '../../core/models/models';

@Component({
    selector: 'app-task-create',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink, MatFormFieldModule, MatInputModule,
        MatSelectModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatSnackBarModule],
    template: `
    <div class="page-container">
      <div class="page-header">
        <a routerLink="/tasks" class="back-link"><mat-icon>arrow_back</mat-icon> Back to Tasks</a>
        <h1>Create New Task</h1>
        <p>Fill in task details and assign to interns</p>
      </div>

      <form (ngSubmit)="onSubmit()" class="form-container">
        <div class="form-grid">
          <div class="form-section">
            <h3 class="section-title">Task Details</h3>

            <mat-form-field appearance="outline">
              <mat-label>Task Title</mat-label>
              <input matInput [(ngModel)]="task.title" name="title" required>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Description</mat-label>
              <textarea matInput [(ngModel)]="task.description" name="description" rows="4"></textarea>
            </mat-form-field>

            <div class="row">
              <mat-form-field appearance="outline">
                <mat-label>Task Type</mat-label>
                <mat-select [(ngModel)]="task.taskType" name="taskType" required>
                  <mat-option value="DAILY">Daily</mat-option>
                  <mat-option value="WEEKLY">Weekly</mat-option>
                  <mat-option value="PROJECT">Project</mat-option>
                  <mat-option value="ASSIGNMENT">Assignment</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Priority</mat-label>
                <mat-select [(ngModel)]="task.priority" name="priority" required>
                  <mat-option value="LOW">Low</mat-option>
                  <mat-option value="MEDIUM">Medium</mat-option>
                  <mat-option value="HIGH">High</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="row">
              <mat-form-field appearance="outline">
                <mat-label>Start Date</mat-label>
                <input matInput type="date" [(ngModel)]="task.startDate" name="startDate" required>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Due Date</mat-label>
                <input matInput type="date" [(ngModel)]="task.dueDate" name="dueDate" required>
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline">
              <mat-label>Attachment URL (optional)</mat-label>
              <input matInput [(ngModel)]="task.attachmentUrl" name="attachmentUrl">
            </mat-form-field>
          </div>

          <div class="form-section">
            <h3 class="section-title">Assignment</h3>

            <mat-form-field appearance="outline">
              <mat-label>Assign To</mat-label>
              <mat-select [(ngModel)]="task.assignTo" name="assignTo" required>
                <mat-option value="ALL">All Interns</mat-option>
                <mat-option value="SELECTED">Selected Interns</mat-option>
                <mat-option value="BATCH">By Batch</mat-option>
                <mat-option value="DOMAIN">By Department</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field *ngIf="task.assignTo === 'BATCH'" appearance="outline">
              <mat-label>Select Batch</mat-label>
              <mat-select [(ngModel)]="task.batchName" name="batchName">
                <mat-option *ngFor="let b of batches" [value]="b">{{ b }}</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field *ngIf="task.assignTo === 'DOMAIN'" appearance="outline">
              <mat-label>Select Department</mat-label>
              <mat-select [(ngModel)]="task.departmentName" name="departmentName">
                <mat-option *ngFor="let d of departments" [value]="d">{{ d }}</mat-option>
              </mat-select>
            </mat-form-field>

            <div *ngIf="task.assignTo === 'SELECTED'" class="intern-selection">
              <p class="selection-label">Select Interns ({{ selectedInternIds.length }} selected)</p>
              <div class="intern-checkbox-list">
                <div *ngFor="let intern of interns" class="intern-check-item">
                  <mat-checkbox [checked]="selectedInternIds.includes(intern.id!)"
                                (change)="toggleIntern(intern.id!)">
                    <span class="check-name">{{ intern.name }}</span>
                    <span class="check-id">{{ intern.internId }}</span>
                  </mat-checkbox>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button mat-raised-button class="btn-primary" type="submit" [disabled]="submitting">
            {{ submitting ? 'Creating...' : 'Create & Assign Task' }}
          </button>
        </div>
      </form>
    </div>
  `,
    styles: [`
    .back-link { display: inline-flex; align-items: center; gap: 4px; color: var(--text-secondary); text-decoration: none; margin-bottom: 12px; }
    .back-link:hover { color: var(--primary-light); }

    .form-container { margin-top: 8px; }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
    @media (max-width: 900px) { .form-grid { grid-template-columns: 1fr; } }

    .form-section {
      background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px;
    }
    .row { display: flex; gap: 16px; }
    .row mat-form-field { flex: 1; }

    .selection-label { color: var(--text-secondary); font-size: 13px; margin-bottom: 8px; }
    .intern-checkbox-list { max-height: 300px; overflow-y: auto; display: flex; flex-direction: column; gap: 4px; }
    .intern-check-item { padding: 6px 8px; border-radius: 6px; }
    .intern-check-item:hover { background: var(--bg-surface); }
    .check-name { font-weight: 600; margin-right: 8px; }
    .check-id { color: var(--text-muted); font-size: 12px; }

    .form-actions { margin-top: 24px; display: flex; justify-content: flex-end; }
  `]
})
export class TaskCreateComponent implements OnInit {
    task: TaskCreateRequest = {
        title: '', description: '', taskType: 'DAILY', startDate: '', dueDate: '',
        priority: 'MEDIUM', assignTo: 'ALL'
    };
    interns: Intern[] = [];
    batches: string[] = [];
    departments: string[] = [];
    selectedInternIds: number[] = [];
    submitting = false;

    constructor(
        private taskService: TaskService,
        private internService: InternService,
        private router: Router,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.internService.getAll().subscribe(i => this.interns = i);
        this.internService.getFilters().subscribe(f => {
            this.batches = f.batches || [];
            this.departments = f.departments || [];
        });
    }

    toggleIntern(id: number): void {
        const idx = this.selectedInternIds.indexOf(id);
        if (idx > -1) this.selectedInternIds.splice(idx, 1);
        else this.selectedInternIds.push(id);
    }

    onSubmit(): void {
        if (!this.task.title || !this.task.startDate || !this.task.dueDate) return;
        this.submitting = true;
        const req = { ...this.task, internIds: this.selectedInternIds };
        this.taskService.create(req).subscribe({
            next: () => {
                this.snackBar.open('Task created and assigned!', 'Close', { duration: 3000 });
                this.router.navigate(['/tasks']);
            },
            error: (err) => {
                this.submitting = false;
                this.snackBar.open('Failed to create task', 'Close', { duration: 3000 });
            }
        });
    }
}
