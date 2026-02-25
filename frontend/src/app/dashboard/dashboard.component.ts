import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DashboardService } from '../core/services/dashboard.service';
import { InternService } from '../core/services/intern.service';
import { DashboardSummary, InternAnalytics } from '../core/models/models';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatSelectModule,
    MatFormFieldModule, FormsModule, MatProgressSpinnerModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Dashboard</h1>
        <p>Welcome back, {{ auth.currentUser?.fullName }}! Here's your overview.</p>
      </div>

      <div *ngIf="loading" class="loading-state">
        <mat-spinner diameter="40"></mat-spinner>
      </div>

      <div *ngIf="!loading">
        <!-- Summary Cards -->
        <div class="card-grid card-grid-4">
          <!-- Role-based user count -->
          <div class="stat-card" *ngIf="auth.isMentor">
            <div class="stat-icon" style="background: rgba(99, 102, 241, 0.15); color: #818cf8;">
              <mat-icon>supervisor_account</mat-icon>
            </div>
            <div class="stat-value">{{ summary?.totalMentors || 0 }}</div>
            <div class="stat-label">Total Mentors</div>
          </div>
          <div class="stat-card" *ngIf="!auth.isMentor">
            <div class="stat-icon" style="background: rgba(99, 102, 241, 0.15); color: #818cf8;">
              <mat-icon>people</mat-icon>
            </div>
            <div class="stat-value">{{ summary?.totalInterns || 0 }}</div>
            <div class="stat-label">Total Interns</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background: rgba(16, 185, 129, 0.15); color: #34d399;">
              <mat-icon>person_check</mat-icon>
            </div>
            <div class="stat-value">{{ summary?.activeInterns || 0 }}</div>
            <div class="stat-label">Active Interns</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background: rgba(14, 165, 233, 0.15); color: #38bdf8;">
              <mat-icon>assignment</mat-icon>
            </div>
            <div class="stat-value">{{ summary?.totalTasks || 0 }}</div>
            <div class="stat-label">Total Tasks</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background: rgba(245, 158, 11, 0.15); color: #fbbf24;">
              <mat-icon>pending</mat-icon>
            </div>
            <div class="stat-value">{{ summary?.pendingTasks || 0 }}</div>
            <div class="stat-label">Pending Tasks</div>
          </div>
        </div>

        <!-- Second Row -->
        <div class="card-grid card-grid-4" style="margin-top: 20px;">
          <div class="stat-card">
            <div class="stat-icon" style="background: rgba(99, 102, 241, 0.15); color: #a78bfa;">
              <mat-icon>check_circle</mat-icon>
            </div>
            <div class="stat-value">{{ summary?.completedTasks || 0 }}</div>
            <div class="stat-label">Completed Tasks</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background: rgba(239, 68, 68, 0.15); color: #f87171;">
              <mat-icon>schedule</mat-icon>
            </div>
            <div class="stat-value">{{ summary?.overdueTasks || 0 }}</div>
            <div class="stat-label">Overdue Tasks</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background: rgba(16, 185, 129, 0.15); color: #34d399;">
              <mat-icon>trending_up</mat-icon>
            </div>
            <div class="stat-value">{{ summary?.avgCompletionPercentage || 0 }}%</div>
            <div class="stat-label">Avg Completion</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background: rgba(148, 163, 184, 0.15); color: #94a3b8;">
              <mat-icon>person_off</mat-icon>
            </div>
            <div class="stat-value">{{ summary?.droppedInterns || 0 }}</div>
            <div class="stat-label">Dropped</div>
          </div>
        </div>

        <!-- Performance Table -->
        <div class="analytics-section" *ngIf="analytics.length > 0">
          <div class="section-header">
            <h2 class="section-title">Intern Performance</h2>
            <div class="section-filters">
              <mat-form-field appearance="outline" style="width: 180px;">
                <mat-label>Filter by Batch</mat-label>
                <mat-select [(ngModel)]="selectedBatch" (selectionChange)="loadAnalytics()">
                  <mat-option value="">All Batches</mat-option>
                  <mat-option *ngFor="let b of batches" [value]="b">{{ b }}</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
          </div>

          <div class="data-table-container">
            <table class="performance-table">
              <thead>
                <tr>
                  <th>Intern</th>
                  <th>Department</th>
                  <th>Total</th>
                  <th>Completed</th>
                  <th>Pending</th>
                  <th>Overdue</th>
                  <th>Completion %</th>
                  <th>Avg Score</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let a of analytics">
                  <td>
                    <div class="intern-cell">
                      <div class="intern-avatar">{{ a.internName?.charAt(0) }}</div>
                      <div>
                        <div class="intern-name">{{ a.internName }}</div>
                        <div class="intern-id">{{ a.internInternId }}</div>
                      </div>
                    </div>
                  </td>
                  <td>{{ a.department || '-' }}</td>
                  <td>{{ a.totalTasks }}</td>
                  <td><span class="text-success">{{ a.completedTasks }}</span></td>
                  <td><span class="text-warning">{{ a.pendingTasks }}</span></td>
                  <td><span class="text-danger">{{ a.overdueTasks }}</span></td>
                  <td>
                    <div class="progress-bar-container">
                      <div class="progress-bar" [style.width.%]="a.completionPercentage"
                           [class.high]="a.completionPercentage >= 75"
                           [class.medium]="a.completionPercentage >= 40 && a.completionPercentage < 75"
                           [class.low]="a.completionPercentage < 40"></div>
                      <span>{{ a.completionPercentage }}%</span>
                    </div>
                  </td>
                  <td>{{ a.averageScore || '-' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .loading-state { display: flex; justify-content: center; padding: 60px; }

    .analytics-section { margin-top: 32px; }
    .section-header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
    .section-filters { display: flex; gap: 12px; }

    .performance-table {
      width: 100%;
      border-collapse: collapse;
    }

    .performance-table th {
      text-align: left;
      padding: 14px 16px;
      color: var(--text-secondary);
      font-weight: 600;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1px solid var(--border);
    }

    .performance-table td {
      padding: 14px 16px;
      border-bottom: 1px solid var(--border);
      font-size: 14px;
    }

    .performance-table tr:hover { background: var(--bg-surface); }

    .intern-cell { display: flex; align-items: center; gap: 10px; }
    .intern-avatar {
      width: 32px; height: 32px; border-radius: 50%;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      display: flex; align-items: center; justify-content: center;
      font-weight: 700; font-size: 13px; color: white;
    }
    .intern-name { font-weight: 600; font-size: 13px; }
    .intern-id { font-size: 11px; color: var(--text-muted); }

    .text-success { color: #34d399; font-weight: 600; }
    .text-warning { color: #fbbf24; font-weight: 600; }
    .text-danger { color: #f87171; font-weight: 600; }

    .progress-bar-container {
      display: flex; align-items: center; gap: 8px;
    }
    .progress-bar-container span { font-size: 12px; font-weight: 600; min-width: 35px; }
    .progress-bar {
      height: 6px; border-radius: 3px; transition: width 0.5s ease;
      min-width: 0; max-width: 100px;
    }
    .progress-bar.high { background: linear-gradient(90deg, #10b981, #34d399); }
    .progress-bar.medium { background: linear-gradient(90deg, #f59e0b, #fbbf24); }
    .progress-bar.low { background: linear-gradient(90deg, #ef4444, #f87171); }
  `]
})
export class DashboardComponent implements OnInit {
  summary: DashboardSummary | null = null;
  analytics: InternAnalytics[] = [];
  batches: string[] = [];
  selectedBatch = '';
  loading = true;

  constructor(
    private dashboardService: DashboardService,
    private internService: InternService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dashboardService.getSummary().subscribe(s => {
      this.summary = s;
      this.loading = false;
    });
    this.loadAnalytics();
    this.internService.getFilters().subscribe(f => {
      this.batches = f.batches || [];
    });
  }

  loadAnalytics(): void {
    this.dashboardService.getAnalytics(this.selectedBatch || undefined).subscribe(a => {
      this.analytics = a;
    });
  }
}
