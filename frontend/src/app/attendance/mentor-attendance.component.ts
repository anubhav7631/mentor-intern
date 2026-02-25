import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-mentor-attendance',
    standalone: true,
    imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule,
        MatSnackBarModule, MatProgressSpinnerModule],
    template: `
    <div class="page-container">
      <div class="page-header">
        <div>
          <h1>Attendance Management</h1>
          <p>Track intern attendance, view reports, and manage leave</p>
        </div>
        <div class="header-actions">
          <button class="btn-tab" [class.active]="tab === 'today'" (click)="tab = 'today'">
            <mat-icon>today</mat-icon> Today
          </button>
          <button class="btn-tab" [class.active]="tab === 'report'" (click)="tab = 'report'; loadReport()">
            <mat-icon>assessment</mat-icon> Report
          </button>
        </div>
      </div>

      <div *ngIf="loading" class="loading-state"><mat-spinner diameter="40"></mat-spinner></div>

      <!-- Today's Attendance Tab -->
      <div *ngIf="!loading && tab === 'today'">
        <!-- Quick Stats -->
        <div class="card-grid card-grid-4" style="margin-bottom: 20px;">
          <div class="stat-card">
            <div class="stat-icon" style="background:rgba(16,185,129,0.15);color:#34d399;"><mat-icon>check_circle</mat-icon></div>
            <div class="stat-value">{{ todayStats.present }}</div>
            <div class="stat-label">Present Today</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background:rgba(239,68,68,0.15);color:#f87171;"><mat-icon>cancel</mat-icon></div>
            <div class="stat-value">{{ todayStats.absent }}</div>
            <div class="stat-label">Not Marked</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background:rgba(99,102,241,0.15);color:#818cf8;"><mat-icon>event_busy</mat-icon></div>
            <div class="stat-value">{{ todayStats.onLeave }}</div>
            <div class="stat-label">On Leave</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background:rgba(245,158,11,0.15);color:#fbbf24;"><mat-icon>timelapse</mat-icon></div>
            <div class="stat-value">{{ todayStats.halfDay }}</div>
            <div class="stat-label">Half Day</div>
          </div>
        </div>

        <!-- Today's Table -->
        <div class="table-card">
          <div class="table-header">
            <h3><mat-icon>groups</mat-icon> Today's Attendance</h3>
            <div class="search-box">
              <mat-icon>search</mat-icon>
              <input class="search-input" placeholder="Search interns..."
                     [(ngModel)]="searchQuery" (input)="filterToday()">
            </div>
          </div>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Intern ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let r of filteredToday">
                  <td class="id-cell">{{ r.internInternId }}</td>
                  <td><strong>{{ r.internName }}</strong></td>
                  <td>{{ r.department || '—' }}</td>
                  <td>{{ r.checkInTime || '—' }}</td>
                  <td>{{ r.checkOutTime || '—' }}</td>
                  <td>
                    <span class="status-badge" [ngClass]="'status-' + r.status">
                      {{ statusLabel(r.status) }}
                    </span>
                  </td>
                  <td>
                    <div class="action-btns">
                      <button class="mini-btn present" title="Mark Present"
                              (click)="markAttendance(r.internId, 'PRESENT')">
                        <mat-icon>check</mat-icon>
                      </button>
                      <button class="mini-btn absent" title="Mark Absent"
                              (click)="markAttendance(r.internId, 'ABSENT')">
                        <mat-icon>close</mat-icon>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div *ngIf="filteredToday.length === 0" class="empty-msg">No interns found</div>
          </div>
        </div>
      </div>

      <!-- Report Tab -->
      <div *ngIf="!loading && tab === 'report'">
        <div class="report-filters">
          <div class="filter-group">
            <label>From</label>
            <input type="date" class="form-input" [(ngModel)]="reportStart" name="rStart">
          </div>
          <div class="filter-group">
            <label>To</label>
            <input type="date" class="form-input" [(ngModel)]="reportEnd" name="rEnd">
          </div>
          <button class="btn-primary" (click)="loadReport()" style="align-self:flex-end;">
            <mat-icon>refresh</mat-icon> Generate
          </button>
        </div>

        <div class="table-card" style="margin-top: 16px;">
          <div class="table-header">
            <h3><mat-icon>assessment</mat-icon> Attendance Report</h3>
          </div>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Intern ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Present</th>
                  <th>Half Day</th>
                  <th>Leave</th>
                  <th>Absent</th>
                  <th>Attendance %</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let r of reportData">
                  <td class="id-cell">{{ r.internInternId }}</td>
                  <td><strong>{{ r.internName }}</strong></td>
                  <td>{{ r.department || '—' }}</td>
                  <td><span class="num-cell green">{{ r.present }}</span></td>
                  <td><span class="num-cell yellow">{{ r.halfDay }}</span></td>
                  <td><span class="num-cell purple">{{ r.onLeave }}</span></td>
                  <td><span class="num-cell red">{{ r.absent }}</span></td>
                  <td>
                    <div class="progress-cell">
                      <div class="progress-bg">
                        <div class="progress-fill" [style.width.%]="r.attendancePercentage"></div>
                      </div>
                      <span>{{ r.attendancePercentage }}%</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div *ngIf="reportData.length === 0" class="empty-msg">No data available</div>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .loading-state { display: flex; justify-content: center; padding: 60px; }

    .header-actions { display: flex; gap: 8px; }
    .btn-tab {
      display: flex; align-items: center; gap: 6px;
      padding: 10px 20px; font-size: 14px; font-weight: 600;
      border-radius: 8px; cursor: pointer; border: 1px solid #334155;
      background: transparent; color: #94a3b8; font-family: inherit;
      transition: all 0.15s;
    }
    .btn-tab:hover { background: rgba(99,102,241,0.08); color: #e2e8f0; }
    .btn-tab.active { background: rgba(99,102,241,0.15); color: #818cf8; border-color: #6366f1; }
    .btn-tab mat-icon { font-size: 18px; width: 18px; height: 18px; }

    .table-card {
      background: #1e293b; border: 1px solid #334155;
      border-radius: 16px; overflow: hidden;
    }
    .table-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 20px 24px; border-bottom: 1px solid #334155;
    }
    .table-header h3 {
      display: flex; align-items: center; gap: 8px;
      font-size: 16px; font-weight: 700; color: #f1f5f9; margin: 0;
    }
    .table-header h3 mat-icon { font-size: 20px; width: 20px; height: 20px; color: #818cf8; }

    .search-box {
      display: flex; align-items: center; gap: 8px;
      background: #0f172a; border: 1px solid #334155;
      border-radius: 8px; padding: 8px 14px;
    }
    .search-box mat-icon { font-size: 18px; width: 18px; height: 18px; color: #64748b; }
    .search-input {
      background: none; border: none; outline: none;
      color: #f1f5f9; font-size: 13px; width: 200px;
    }

    .table-container { overflow-x: auto; }
    table {
      width: 100%; border-collapse: collapse;
    }
    thead th {
      text-align: left; padding: 14px 16px;
      font-size: 11px; font-weight: 700; color: #64748b;
      text-transform: uppercase; letter-spacing: 0.5px;
      background: #0f172a;
    }
    tbody td {
      padding: 14px 16px; font-size: 14px;
      color: #e2e8f0; border-bottom: 1px solid #334155;
    }
    tr:last-child td { border-bottom: none; }
    tr:hover td { background: rgba(99,102,241,0.04); }
    .id-cell { color: #64748b; font-family: monospace; font-size: 13px; }

    .status-badge {
      display: inline-block; padding: 4px 12px; border-radius: 20px;
      font-size: 11px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .status-PRESENT { background: rgba(16,185,129,0.15); color: #34d399; }
    .status-ABSENT { background: rgba(239,68,68,0.15); color: #f87171; }
    .status-HALF_DAY { background: rgba(245,158,11,0.15); color: #fbbf24; }
    .status-ON_LEAVE { background: rgba(99,102,241,0.15); color: #818cf8; }
    .status-NOT_MARKED { background: rgba(148,163,184,0.15); color: #94a3b8; }

    .action-btns { display: flex; gap: 6px; }
    .mini-btn {
      width: 30px; height: 30px; border-radius: 6px;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; border: 1px solid; transition: all 0.15s;
      background: transparent;
    }
    .mini-btn mat-icon { font-size: 16px; width: 16px; height: 16px; }
    .mini-btn.present { color: #34d399; border-color: rgba(16,185,129,0.3); }
    .mini-btn.present:hover { background: rgba(16,185,129,0.1); }
    .mini-btn.absent { color: #f87171; border-color: rgba(239,68,68,0.3); }
    .mini-btn.absent:hover { background: rgba(239,68,68,0.1); }

    .report-filters {
      display: flex; gap: 16px; align-items: flex-end; flex-wrap: wrap;
    }
    .filter-group { display: flex; flex-direction: column; gap: 4px; }
    .filter-group label {
      font-size: 11px; font-weight: 600; color: #94a3b8;
      text-transform: uppercase; letter-spacing: 0.5px;
    }
    .form-input {
      padding: 10px 14px; background: #0f172a;
      border: 1px solid #334155; border-radius: 8px;
      color: #f1f5f9; font-size: 14px; font-family: inherit;
      outline: none;
    }
    .form-input:focus { border-color: #818cf8; }

    .num-cell { font-weight: 600; font-size: 14px; }
    .num-cell.green { color: #34d399; }
    .num-cell.yellow { color: #fbbf24; }
    .num-cell.purple { color: #818cf8; }
    .num-cell.red { color: #f87171; }

    .progress-cell {
      display: flex; align-items: center; gap: 10px;
    }
    .progress-bg {
      flex: 1; height: 8px; background: #334155;
      border-radius: 4px; overflow: hidden; min-width: 80px;
    }
    .progress-fill {
      height: 100%; border-radius: 4px;
      background: linear-gradient(90deg, #6366f1, #34d399);
      transition: width 0.3s;
    }
    .progress-cell span { font-size: 13px; font-weight: 600; color: #e2e8f0; min-width: 40px; }

    .empty-msg { text-align: center; padding: 40px; color: #64748b; font-size: 14px; }

    @media (max-width: 768px) {
      .report-filters { flex-direction: column; }
    }
  `]
})
export class MentorAttendanceComponent implements OnInit {
    tab = 'today';
    loading = true;
    searchQuery = '';

    todayData: any[] = [];
    filteredToday: any[] = [];
    todayStats = { present: 0, absent: 0, onLeave: 0, halfDay: 0 };

    reportData: any[] = [];
    reportStart = '';
    reportEnd = '';

    private apiUrl = `${environment.apiUrl}/attendance`;

    constructor(
        private http: HttpClient,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        this.reportStart = firstDay.toISOString().substring(0, 10);
        this.reportEnd = today.toISOString().substring(0, 10);
        this.loadToday();
    }

    loadToday(): void {
        this.loading = true;
        this.http.get<any[]>(`${this.apiUrl}/today`).subscribe({
            next: (data) => {
                this.todayData = data;
                this.filterToday();
                this.computeTodayStats();
                this.loading = false;
            },
            error: () => {
                this.loading = false;
                this.snackBar.open('Failed to load attendance', 'Close', { duration: 3000 });
            }
        });
    }

    filterToday(): void {
        const q = this.searchQuery.toLowerCase();
        this.filteredToday = this.todayData.filter(r =>
            !q ||
            r.internName?.toLowerCase().includes(q) ||
            r.internInternId?.toLowerCase().includes(q) ||
            r.department?.toLowerCase().includes(q)
        );
    }

    computeTodayStats(): void {
        this.todayStats = { present: 0, absent: 0, onLeave: 0, halfDay: 0 };
        for (const r of this.todayData) {
            if (r.status === 'PRESENT') this.todayStats.present++;
            else if (r.status === 'HALF_DAY') this.todayStats.halfDay++;
            else if (r.status === 'ON_LEAVE') this.todayStats.onLeave++;
            else this.todayStats.absent++;
        }
    }

    markAttendance(internId: number, status: string): void {
        const today = new Date().toISOString().substring(0, 10);
        this.http.post(`${this.apiUrl}/mark/${internId}`, {
            date: today,
            status: status,
            remarks: null
        }).subscribe({
            next: () => {
                this.snackBar.open(`Marked as ${status.toLowerCase()}`, 'Close', { duration: 2000 });
                this.loadToday();
            },
            error: (err) => {
                this.snackBar.open(err.error?.message || 'Failed to mark', 'Close', { duration: 3000 });
            }
        });
    }

    loadReport(): void {
        this.loading = true;
        const params = `?start=${this.reportStart}&end=${this.reportEnd}`;
        this.http.get<any[]>(`${this.apiUrl}/report${params}`).subscribe({
            next: (data) => {
                this.reportData = data;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
                this.snackBar.open('Failed to load report', 'Close', { duration: 3000 });
            }
        });
    }

    statusLabel(status: string): string {
        const labels: any = {
            'PRESENT': 'Present', 'ABSENT': 'Absent', 'HALF_DAY': 'Half Day',
            'ON_LEAVE': 'On Leave', 'HOLIDAY': 'Holiday', 'NOT_MARKED': 'Not Marked'
        };
        return labels[status] || status;
    }
}
