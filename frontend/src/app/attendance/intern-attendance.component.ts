import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../core/services/auth.service';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-intern-attendance',
    standalone: true,
    imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule,
        MatSnackBarModule, MatProgressSpinnerModule, MatSelectModule, MatFormFieldModule],
    template: `
    <div class="page-container">
      <div class="page-header">
        <h1>My Attendance</h1>
        <p>Track your daily attendance, apply for leave, and view history</p>
      </div>

      <!-- Today's Status Card -->
      <div class="today-card">
        <div class="today-left">
          <div class="today-date">
            <mat-icon>calendar_today</mat-icon>
            <div>
              <h3>{{ todayFormatted }}</h3>
              <span class="day-name">{{ dayName }}</span>
            </div>
          </div>
          <div class="status-badge" [ngClass]="'status-' + (todayStatus?.status || 'NOT_MARKED')">
            {{ statusLabel(todayStatus?.status) }}
          </div>
        </div>
        <div class="today-times" *ngIf="todayStatus?.checkInTime">
          <div class="time-item">
            <mat-icon>login</mat-icon>
            <div><small>Check In</small><span>{{ todayStatus.checkInTime }}</span></div>
          </div>
          <div class="time-item" *ngIf="todayStatus?.checkOutTime">
            <mat-icon>logout</mat-icon>
            <div><small>Check Out</small><span>{{ todayStatus.checkOutTime }}</span></div>
          </div>
        </div>
        <div class="today-actions">
          <button class="btn-primary btn-checkin" (click)="checkIn()"
                  [disabled]="todayStatus?.checkInTime || loading">
            <mat-icon>login</mat-icon> Check In
          </button>
          <button class="btn-checkout" (click)="checkOut()"
                  [disabled]="!todayStatus?.checkInTime || todayStatus?.checkOutTime || loading">
            <mat-icon>logout</mat-icon> Check Out
          </button>
        </div>
      </div>

      <!-- Stats Row -->
      <div class="card-grid card-grid-4" *ngIf="stats" style="margin-top: 20px;">
        <div class="stat-card">
          <div class="stat-icon" style="background:rgba(16,185,129,0.15);color:#34d399;"><mat-icon>check_circle</mat-icon></div>
          <div class="stat-value">{{ stats.present }}</div>
          <div class="stat-label">Present</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:rgba(245,158,11,0.15);color:#fbbf24;"><mat-icon>timelapse</mat-icon></div>
          <div class="stat-value">{{ stats.halfDay }}</div>
          <div class="stat-label">Half Days</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:rgba(99,102,241,0.15);color:#818cf8;"><mat-icon>event_busy</mat-icon></div>
          <div class="stat-value">{{ stats.onLeave }}</div>
          <div class="stat-label">On Leave</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:rgba(14,165,233,0.15);color:#38bdf8;"><mat-icon>percent</mat-icon></div>
          <div class="stat-value">{{ stats.attendancePercentage }}%</div>
          <div class="stat-label">Attendance</div>
        </div>
      </div>

      <!-- Apply Leave + History -->
      <div class="two-col" style="margin-top: 24px;">
        <!-- Apply Leave -->
        <div class="form-card">
          <h3><mat-icon>event_busy</mat-icon> Apply for Leave</h3>
          <form (ngSubmit)="applyLeave()" class="profile-form">
            <div class="form-group">
              <label>Date</label>
              <input class="form-input" type="date" [(ngModel)]="leaveDate" name="leaveDate" required>
            </div>
            <div class="form-group">
              <label>Leave Type</label>
              <select class="form-input" [(ngModel)]="leaveType" name="leaveType" required>
                <option value="">Select type</option>
                <option value="SICK">Sick Leave</option>
                <option value="CASUAL">Casual Leave</option>
                <option value="PERSONAL">Personal Leave</option>
                <option value="EMERGENCY">Emergency</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label>Reason</label>
              <textarea class="form-input" [(ngModel)]="leaveReason" name="leaveReason" rows="3"
                        placeholder="Briefly describe your reason..."></textarea>
            </div>
            <button class="btn-primary submit-btn" type="submit"
                    [disabled]="!leaveDate || !leaveType || applyingLeave">
              <span *ngIf="!applyingLeave">Submit Leave</span>
              <mat-spinner *ngIf="applyingLeave" diameter="18"></mat-spinner>
            </button>
          </form>
        </div>

        <!-- History -->
        <div class="form-card">
          <h3><mat-icon>history</mat-icon> Attendance History</h3>
          <div class="history-list" *ngIf="history.length > 0">
            <div *ngFor="let h of history" class="history-row">
              <div class="history-date">{{ h.date }}</div>
              <div class="history-times">
                <span *ngIf="h.checkInTime">In: {{ h.checkInTime }}</span>
                <span *ngIf="h.checkOutTime"> · Out: {{ h.checkOutTime }}</span>
                <span *ngIf="h.leaveType" class="leave-tag">{{ h.leaveType }}</span>
              </div>
              <div class="status-badge small" [ngClass]="'status-' + h.status">
                {{ statusLabel(h.status) }}
              </div>
            </div>
          </div>
          <div *ngIf="history.length === 0" class="empty-msg">
            No attendance records found for this month.
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .today-card {
      display: flex; align-items: center; gap: 24px; flex-wrap: wrap;
      background: #1e293b; border: 1px solid #334155;
      border-radius: 16px; padding: 24px 28px;
    }
    .today-left { display: flex; align-items: center; gap: 20px; flex: 1; }
    .today-date { display: flex; align-items: center; gap: 12px; }
    .today-date mat-icon { font-size: 28px; width: 28px; height: 28px; color: #818cf8; }
    .today-date h3 { font-size: 18px; font-weight: 700; color: #f1f5f9; margin: 0; }
    .day-name { font-size: 13px; color: #64748b; }

    .today-times { display: flex; gap: 24px; }
    .time-item { display: flex; align-items: center; gap: 8px; }
    .time-item mat-icon { font-size: 18px; width: 18px; height: 18px; color: #64748b; }
    .time-item small { font-size: 11px; color: #64748b; display: block; }
    .time-item span { font-size: 14px; font-weight: 600; color: #e2e8f0; }

    .today-actions { display: flex; gap: 10px; }
    .btn-checkin {
      display: flex; align-items: center; gap: 6px;
      padding: 10px 20px; font-size: 14px;
    }
    .btn-checkout {
      display: flex; align-items: center; gap: 6px;
      padding: 10px 20px; font-size: 14px;
      background: transparent; border: 1px solid #334155;
      color: #e2e8f0; border-radius: 8px; cursor: pointer;
      font-family: inherit; font-weight: 600;
      transition: all 0.15s;
    }
    .btn-checkout:hover:not(:disabled) { background: rgba(239, 68, 68, 0.1); border-color: #f87171; color: #f87171; }
    .btn-checkout:disabled { opacity: 0.4; cursor: not-allowed; }

    .status-badge {
      padding: 6px 14px; border-radius: 20px;
      font-size: 12px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .status-badge.small { padding: 3px 10px; font-size: 11px; }
    .status-PRESENT { background: rgba(16,185,129,0.15); color: #34d399; }
    .status-ABSENT { background: rgba(239,68,68,0.15); color: #f87171; }
    .status-HALF_DAY { background: rgba(245,158,11,0.15); color: #fbbf24; }
    .status-ON_LEAVE { background: rgba(99,102,241,0.15); color: #818cf8; }
    .status-NOT_MARKED { background: rgba(148,163,184,0.15); color: #94a3b8; }
    .status-HOLIDAY { background: rgba(14,165,233,0.15); color: #38bdf8; }

    .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    @media (max-width: 768px) { .two-col { grid-template-columns: 1fr; } }

    .form-card {
      background: #1e293b; border: 1px solid #334155;
      border-radius: 16px; padding: 28px;
    }
    .form-card h3 {
      display: flex; align-items: center; gap: 8px;
      font-size: 16px; font-weight: 700; color: #f1f5f9;
      margin-bottom: 24px; padding-bottom: 16px;
      border-bottom: 1px solid #334155;
    }
    .form-card h3 mat-icon { font-size: 20px; width: 20px; height: 20px; color: #818cf8; }

    .profile-form { display: flex; flex-direction: column; gap: 18px; }
    .form-group { display: flex; flex-direction: column; gap: 6px; }
    .form-group label {
      font-size: 12px; font-weight: 600; color: #94a3b8;
      text-transform: uppercase; letter-spacing: 0.5px;
    }
    .form-input {
      padding: 12px 14px; background: #0f172a;
      border: 1px solid #334155; border-radius: 8px;
      color: #f1f5f9; font-size: 14px; font-family: inherit;
      outline: none; transition: border-color 0.2s;
      width: 100%; box-sizing: border-box;
    }
    .form-input:focus { border-color: #818cf8; }
    textarea.form-input { resize: vertical; }
    select.form-input { appearance: auto; }
    .submit-btn {
      display: flex; align-items: center; justify-content: center; gap: 8px;
      height: 44px; font-size: 14px; margin-top: 4px;
    }

    .history-list { max-height: 360px; overflow-y: auto; }
    .history-row {
      display: flex; align-items: center; gap: 12px;
      padding: 12px 0; border-bottom: 1px solid #334155;
    }
    .history-row:last-child { border-bottom: none; }
    .history-date { font-size: 14px; font-weight: 600; color: #e2e8f0; min-width: 100px; }
    .history-times { flex: 1; font-size: 13px; color: #94a3b8; }
    .leave-tag {
      display: inline-block; padding: 2px 8px; border-radius: 4px;
      background: rgba(99,102,241,0.1); color: #a5b4fc;
      font-size: 11px; font-weight: 600; margin-left: 6px;
    }
    .empty-msg { text-align: center; padding: 40px; color: #64748b; font-size: 14px; }
  `]
})
export class InternAttendanceComponent implements OnInit {
    todayStatus: any = null;
    stats: any = null;
    history: any[] = [];
    loading = false;
    applyingLeave = false;

    leaveDate = '';
    leaveType = '';
    leaveReason = '';

    internDbId: number | null = null;
    todayFormatted = '';
    dayName = '';

    private apiUrl = `${environment.apiUrl}/attendance`;

    constructor(
        private http: HttpClient,
        public auth: AuthService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        const today = new Date();
        this.todayFormatted = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        this.dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
        this.resolveInternId();
    }

    resolveInternId(): void {
        this.http.get<any>(`${this.apiUrl}/my-intern-id`).subscribe({
            next: (res) => {
                if (res.internId && res.internId > 0) {
                    this.internDbId = res.internId;
                    this.loadAll();
                } else {
                    this.snackBar.open('No intern record linked to your account', 'Close', { duration: 5000 });
                }
            },
            error: () => {
                this.snackBar.open('Failed to load intern profile', 'Close', { duration: 3000 });
            }
        });
    }

    loadAll(): void {
        if (!this.internDbId) return;
        this.loadTodayStatus();
        this.loadStats();
        this.loadHistory();
    }

    loadTodayStatus(): void {
        this.http.get(`${this.apiUrl}/today/${this.internDbId}`).subscribe({
            next: (data) => this.todayStatus = data,
            error: () => { }
        });
    }

    loadStats(): void {
        this.http.get(`${this.apiUrl}/stats/${this.internDbId}`).subscribe({
            next: (data) => this.stats = data,
            error: () => { }
        });
    }

    loadHistory(): void {
        this.http.get<any[]>(`${this.apiUrl}/history/${this.internDbId}`).subscribe({
            next: (data) => this.history = data,
            error: () => { }
        });
    }

    checkIn(): void {
        if (!this.internDbId) return;
        this.loading = true;
        this.http.post(`${this.apiUrl}/check-in/${this.internDbId}`, {}).subscribe({
            next: (res: any) => {
                this.loading = false;
                this.snackBar.open(res.message, 'Close', { duration: 3000 });
                this.loadAll();
            },
            error: (err) => {
                this.loading = false;
                this.snackBar.open(err.error?.message || 'Check-in failed', 'Close', { duration: 3000 });
            }
        });
    }

    checkOut(): void {
        if (!this.internDbId) return;
        this.loading = true;
        this.http.post(`${this.apiUrl}/check-out/${this.internDbId}`, {}).subscribe({
            next: (res: any) => {
                this.loading = false;
                this.snackBar.open(res.message, 'Close', { duration: 3000 });
                this.loadAll();
            },
            error: (err) => {
                this.loading = false;
                this.snackBar.open(err.error?.message || 'Check-out failed', 'Close', { duration: 3000 });
            }
        });
    }

    applyLeave(): void {
        if (!this.internDbId || !this.leaveDate || !this.leaveType) return;
        this.applyingLeave = true;
        this.http.post(`${this.apiUrl}/leave/${this.internDbId}`, {
            date: this.leaveDate,
            leaveType: this.leaveType,
            reason: this.leaveReason
        }).subscribe({
            next: (res: any) => {
                this.applyingLeave = false;
                this.snackBar.open(res.message, 'Close', { duration: 3000 });
                this.leaveDate = '';
                this.leaveType = '';
                this.leaveReason = '';
                this.loadAll();
            },
            error: (err) => {
                this.applyingLeave = false;
                this.snackBar.open(err.error?.message || 'Failed to apply leave', 'Close', { duration: 3000 });
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
