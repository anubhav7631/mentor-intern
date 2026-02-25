import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ReportService } from '../core/services/report.service';

@Component({
    selector: 'app-reports',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatSnackBarModule],
    template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Reports & Export</h1>
        <p>Download detailed performance and task reports as Excel files</p>
      </div>

      <div class="reports-grid">
        <div class="report-card">
          <div class="report-icon" style="background: linear-gradient(135deg, #6366f1, #818cf8);">
            <mat-icon>people</mat-icon>
          </div>
          <div class="report-info">
            <h3>Intern Performance Report</h3>
            <p>Comprehensive report with each intern's task completion rate, average scores, and overall performance metrics.</p>
            <ul class="report-includes">
              <li>Intern details & status</li>
              <li>Task completion percentage</li>
              <li>Average scores & ranking</li>
              <li>Department & batch breakdown</li>
            </ul>
          </div>
          <button class="btn-primary download-btn" (click)="downloadInternReport()">
            <mat-icon>download</mat-icon> Download Report
          </button>
        </div>

        <div class="report-card">
          <div class="report-icon" style="background: linear-gradient(135deg, #0ea5e9, #38bdf8);">
            <mat-icon>assignment</mat-icon>
          </div>
          <div class="report-info">
            <h3>Task Summary Report</h3>
            <p>Detailed task breakdown showing assignment distribution, completion status, and overdue analysis.</p>
            <ul class="report-includes">
              <li>Task details & priority</li>
              <li>Assignment distribution</li>
              <li>Completion vs pending counts</li>
              <li>Overdue task analysis</li>
            </ul>
          </div>
          <button class="btn-primary download-btn" style="background: linear-gradient(135deg, #0ea5e9, #0284c7) !important;"
                  (click)="downloadTaskReport()">
            <mat-icon>download</mat-icon> Download Report
          </button>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .reports-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 24px;
    }

    .report-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 28px;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .report-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }

    .report-icon {
      width: 56px;
      height: 56px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }

    .report-icon mat-icon { color: white; font-size: 28px; width: 28px; height: 28px; }

    .report-info h3 { font-size: 18px; font-weight: 700; margin-bottom: 8px; }
    .report-info p { color: var(--text-secondary); font-size: 14px; line-height: 1.6; margin-bottom: 16px; }

    .report-includes {
      list-style: none; padding: 0; margin-bottom: 24px;
    }
    .report-includes li {
      padding: 4px 0;
      color: var(--text-secondary);
      font-size: 13px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .report-includes li::before {
      content: '✓';
      color: var(--success);
      font-weight: 700;
    }

    .download-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      justify-content: center;
    }
  `]
})
export class ReportsComponent {
    constructor(private reportService: ReportService, private snackBar: MatSnackBar) { }

    downloadInternReport(): void {
        this.reportService.downloadInternPerformance();
        this.snackBar.open('Downloading intern performance report...', 'Close', { duration: 2000 });
    }

    downloadTaskReport(): void {
        this.reportService.downloadTaskSummary();
        this.snackBar.open('Downloading task summary report...', 'Close', { duration: 2000 });
    }
}
