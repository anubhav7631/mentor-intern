import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InternService } from '../../core/services/intern.service';
import { Intern } from '../../core/models/models';

@Component({
  selector: 'app-intern-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatSnackBarModule,
    MatProgressSpinnerModule, MatTooltipModule],
  template: `
    <div class="page-container">
      <!-- Header -->
      <div class="page-header">
        <div class="header-row">
          <div>
            <h1>Intern Management</h1>
            <p>Manage your intern data, upload Excel files, and track performance</p>
          </div>
          <div class="header-btns">
            <button class="add-btn" (click)="showAddForm = !showAddForm">
              <mat-icon>{{ showAddForm ? 'close' : 'person_add' }}</mat-icon>
              <span>{{ showAddForm ? 'Cancel' : 'Add Intern' }}</span>
            </button>
            <label class="upload-btn" matTooltip="Upload .xlsx file">
              <mat-icon>cloud_upload</mat-icon>
              <span>Upload Excel</span>
              <input type="file" accept=".xlsx,.xls" (change)="onFileUpload($event)" hidden>
            </label>
          </div>
        </div>
      </div>

      <!-- Upload Result Banner -->
      <div *ngIf="uploadResult" class="upload-banner"
           [class.upload-success]="uploadResult.errorRows === 0"
           [class.upload-warning]="uploadResult.errorRows > 0">
        <mat-icon>{{ uploadResult.errorRows === 0 ? 'check_circle' : 'warning' }}</mat-icon>
        <div class="upload-banner-text">
          <strong>{{ uploadResult.message }}</strong>
          <div *ngIf="uploadResult.errors?.length > 0" class="error-list">
            <div *ngFor="let e of uploadResult.errors">{{ e }}</div>
          </div>
        </div>
        <button mat-icon-button (click)="uploadResult = null"><mat-icon>close</mat-icon></button>
      </div>

      <!-- Add Intern Form -->
      <div *ngIf="showAddForm" class="add-form-panel">
        <h3><mat-icon>person_add</mat-icon> Add New Intern</h3>
        <div class="form-grid">
          <div class="form-field">
            <label>Intern ID *</label>
            <input class="form-input" [(ngModel)]="newIntern.internId" placeholder="e.g. INT-001">
          </div>
          <div class="form-field">
            <label>Full Name *</label>
            <input class="form-input" [(ngModel)]="newIntern.name" placeholder="Enter full name">
          </div>
          <div class="form-field">
            <label>Email *</label>
            <input class="form-input" type="email" [(ngModel)]="newIntern.email" placeholder="Enter email">
          </div>
          <div class="form-field">
            <label>Phone</label>
            <input class="form-input" [(ngModel)]="newIntern.phone" placeholder="Enter phone number">
          </div>
          <div class="form-field">
            <label>College / University</label>
            <input class="form-input" [(ngModel)]="newIntern.college" placeholder="Enter college name">
          </div>
          <div class="form-field">
            <label>Department / Domain</label>
            <input class="form-input" [(ngModel)]="newIntern.department" placeholder="e.g. Computer Science">
          </div>
          <div class="form-field">
            <label>Batch</label>
            <input class="form-input" [(ngModel)]="newIntern.batch" placeholder="e.g. 2026-A">
          </div>
          <div class="form-field">
            <label>Start Date *</label>
            <input class="form-input" type="date" [(ngModel)]="newIntern.startDate">
          </div>
          <div class="form-field">
            <label>End Date</label>
            <input class="form-input" type="date" [(ngModel)]="newIntern.endDate">
          </div>
          <div class="form-field">
            <label>Status</label>
            <select class="form-input" [(ngModel)]="newIntern.status">
              <option value="ACTIVE">Active</option>
              <option value="COMPLETED">Completed</option>
              <option value="DROPPED">Dropped</option>
            </select>
          </div>
        </div>
        <div class="form-actions">
          <button class="btn-submit" (click)="addIntern()" [disabled]="addingIntern">
            <mat-icon>{{ addingIntern ? 'hourglass_empty' : 'check' }}</mat-icon>
            {{ addingIntern ? 'Adding...' : 'Add Intern' }}
          </button>
          <button class="btn-cancel" (click)="showAddForm = false">Cancel</button>
        </div>
      </div>

      <!-- Search & Filters Section -->
      <div class="filters-section">
        <h3 class="filters-title"><mat-icon>filter_list</mat-icon> Search & Filter</h3>
        <div class="filters-row">
          <div class="search-input-wrapper">
            <mat-icon class="search-icon-inside">search</mat-icon>
            <input class="search-input" [(ngModel)]="searchQuery"
                   (input)="onSearch()" placeholder="Search by name, ID, or email..."
                   autocomplete="off">
          </div>
          <div class="filter-group">
            <label class="filter-label">Status</label>
            <select class="filter-select" [(ngModel)]="statusFilter" (change)="onSearch()">
              <option value="">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="COMPLETED">Completed</option>
              <option value="DROPPED">Dropped</option>
            </select>
          </div>
          <div class="filter-group">
            <label class="filter-label">Batch</label>
            <select class="filter-select" [(ngModel)]="batchFilter" (change)="onSearch()">
              <option value="">All Batches</option>
              <option *ngFor="let b of batches" [value]="b">{{ b }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label class="filter-label">Department</label>
            <select class="filter-select" [(ngModel)]="deptFilter" (change)="onSearch()">
              <option value="">All Departments</option>
              <option *ngFor="let d of departments" [value]="d">{{ d }}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Summary Count -->
      <div class="results-count" *ngIf="!loading">
        <span>Showing <strong>{{ interns.length }}</strong> intern{{ interns.length !== 1 ? 's' : '' }}</span>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="loading-state"><mat-spinner diameter="40"></mat-spinner></div>

      <!-- Intern Cards Table -->
      <div *ngIf="!loading && interns.length > 0" class="intern-table-wrap">
        <table class="intern-table">
          <thead>
            <tr>
              <th class="col-intern">Intern</th>
              <th class="col-id">Intern ID</th>
              <th class="col-college">College</th>
              <th class="col-dept">Department</th>
              <th class="col-duration">Duration</th>
              <th class="col-status">Status</th>
              <th class="col-tasks">Tasks</th>
              <th class="col-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let intern of interns; let i = index"
                (click)="viewProfile(intern)"
                class="intern-row"
                [class.row-even]="i % 2 === 0">
              <!-- Intern Name + Email -->
              <td class="col-intern">
                <div class="intern-identity">
                  <div class="avatar">{{ intern.name?.charAt(0)?.toUpperCase() }}</div>
                  <div class="identity-text">
                    <div class="intern-name">{{ intern.name }}</div>
                    <div class="intern-email">{{ intern.email }}</div>
                  </div>
                </div>
              </td>
              <!-- Intern ID -->
              <td class="col-id">
                <span class="id-badge">{{ intern.internId }}</span>
              </td>
              <!-- College -->
              <td class="col-college">{{ intern.college || '—' }}</td>
              <!-- Department -->
              <td class="col-dept">
                <span class="dept-tag" *ngIf="intern.department">{{ intern.department }}</span>
                <span *ngIf="!intern.department" class="text-muted">—</span>
              </td>
              <!-- Duration -->
              <td class="col-duration">
                <div class="duration-range">
                  <span>{{ intern.startDate | date:'MMM d, y' }}</span>
                  <mat-icon class="arrow-icon">arrow_forward</mat-icon>
                  <span>{{ intern.endDate | date:'MMM d, y' }}</span>
                </div>
              </td>
              <!-- Status -->
              <td class="col-status">
                <span class="status-pill" [ngClass]="'pill-' + intern.status?.toLowerCase()">
                  <span class="status-dot"></span>
                  {{ intern.status }}
                </span>
              </td>
              <!-- Tasks -->
              <td class="col-tasks">
                <div class="task-progress">
                  <span class="task-done">{{ intern.completedTasks || 0 }}</span>
                  <span class="task-sep">/</span>
                  <span class="task-total">{{ intern.totalTasks || 0 }}</span>
                </div>
              </td>
              <!-- Actions -->
              <td class="col-actions">
                <button class="action-btn view-btn" matTooltip="View Profile"
                        (click)="viewProfile(intern); $event.stopPropagation()">
                  <mat-icon>visibility</mat-icon>
                </button>
                <button class="action-btn delete-btn" matTooltip="Delete Intern"
                        (click)="deleteIntern(intern); $event.stopPropagation()">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div *ngIf="!loading && interns.length === 0" class="empty-state-card">
        <mat-icon>people_outline</mat-icon>
        <h3>No Interns Found</h3>
        <p>Click "Add Intern" to add a new intern, upload an Excel file, or adjust your search filters.</p>
      </div>
    </div>
  `,
  styles: [`
    /* === HEADER === */
    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 16px;
    }

    .header-btns { display: flex; gap: 12px; flex-wrap: wrap; }

    .add-btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 10px 24px; border-radius: 8px;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: white; font-weight: 600; cursor: pointer;
      transition: all 0.2s; font-size: 14px; border: none; font-family: inherit;
    }
    .add-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4); }

    .upload-btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 10px 24px; border-radius: 8px;
      background: linear-gradient(135deg, #10b981, #059669);
      color: white; font-weight: 600; cursor: pointer;
      transition: all 0.2s; font-size: 14px;
    }
    .upload-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4); }

    /* === UPLOAD BANNER === */
    .upload-banner {
      display: flex; align-items: flex-start; gap: 12px; padding: 16px;
      border-radius: 8px; margin-bottom: 20px;
    }
    .upload-success { background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); }
    .upload-success mat-icon { color: #34d399; }
    .upload-warning { background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); }
    .upload-warning mat-icon { color: #fbbf24; }
    .upload-banner-text { flex: 1; }
    .upload-banner-text strong { color: #f1f5f9; }
    .error-list { margin-top: 8px; font-size: 12px; color: #94a3b8; max-height: 100px; overflow-y: auto; }

    /* === FILTERS SECTION === */
    .filters-section {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 20px 24px;
      margin-bottom: 16px;
    }

    .filters-title {
      display: flex; align-items: center; gap: 8px;
      font-size: 14px; font-weight: 600; color: #94a3b8;
      margin-bottom: 16px; text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .filters-title mat-icon { font-size: 18px; width: 18px; height: 18px; }

    .filters-row {
      display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-end;
    }

    .search-input-wrapper {
      flex: 1; min-width: 280px; position: relative;
    }
    .search-icon-inside {
      position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
      color: #64748b; font-size: 20px; width: 20px; height: 20px;
    }
    .search-input {
      width: 100%; padding: 12px 12px 12px 42px;
      background: #0f172a; border: 1px solid #334155; border-radius: 8px;
      color: #f1f5f9; font-size: 14px; font-family: inherit;
      outline: none; transition: border-color 0.2s;
    }
    .search-input::placeholder { color: #64748b; }
    .search-input:focus { border-color: #818cf8; }

    .filter-group {
      display: flex; flex-direction: column; gap: 4px; min-width: 160px;
    }
    .filter-label {
      font-size: 11px; font-weight: 600; color: #64748b;
      text-transform: uppercase; letter-spacing: 0.5px;
    }
    .filter-select {
      padding: 11px 12px; background: #0f172a;
      border: 1px solid #334155; border-radius: 8px;
      color: #f1f5f9; font-size: 14px; font-family: inherit;
      outline: none; cursor: pointer; transition: border-color 0.2s;
      appearance: auto;
    }
    .filter-select:focus { border-color: #818cf8; }
    .filter-select option { background: #1e293b; color: #f1f5f9; }

    /* === RESULTS COUNT === */
    .results-count {
      margin-bottom: 12px; font-size: 13px; color: #64748b;
    }
    .results-count strong { color: #94a3b8; }

    /* === LOADING === */
    .loading-state { display: flex; justify-content: center; padding: 60px; }

    /* === TABLE === */
    .intern-table-wrap {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      overflow: hidden;
    }

    .intern-table {
      width: 100%; border-collapse: collapse;
    }

    .intern-table thead tr {
      background: #0f172a;
    }
    .intern-table th {
      text-align: left; padding: 14px 16px;
      color: #64748b; font-weight: 700; font-size: 11px;
      text-transform: uppercase; letter-spacing: 0.8px;
      border-bottom: 2px solid #334155;
      white-space: nowrap;
    }
    .intern-table td {
      padding: 16px; border-bottom: 1px solid #1e293b;
      font-size: 14px; color: #e2e8f0;
      vertical-align: middle;
    }

    .intern-row {
      cursor: pointer; transition: background 0.15s;
    }
    .intern-row:hover { background: #334155 !important; }
    .row-even { background: rgba(15, 23, 42, 0.3); }

    /* Column widths */
    .col-intern { min-width: 220px; }
    .col-id { min-width: 100px; }
    .col-college { min-width: 140px; }
    .col-dept { min-width: 120px; }
    .col-duration { min-width: 200px; }
    .col-status { min-width: 100px; }
    .col-tasks { min-width: 80px; text-align: center; }
    .col-actions { min-width: 100px; text-align: center; }

    /* === INTERN IDENTITY CELL === */
    .intern-identity {
      display: flex; align-items: center; gap: 12px;
    }
    .avatar {
      width: 40px; height: 40px; border-radius: 50%;
      background: linear-gradient(135deg, #6366f1, #0ea5e9);
      display: flex; align-items: center; justify-content: center;
      font-weight: 700; font-size: 16px; color: white; flex-shrink: 0;
      letter-spacing: 0.5px;
    }
    .identity-text { display: flex; flex-direction: column; gap: 2px; }
    .intern-name { font-weight: 600; color: #f1f5f9; font-size: 14px; }
    .intern-email { font-size: 12px; color: #64748b; }

    /* === ID BADGE === */
    .id-badge {
      display: inline-block;
      padding: 4px 10px; border-radius: 6px;
      background: rgba(99, 102, 241, 0.12); color: #a5b4fc;
      font-size: 12px; font-weight: 600; font-family: monospace;
      letter-spacing: 0.3px;
    }

    /* === DEPT TAG === */
    .dept-tag {
      display: inline-block;
      padding: 4px 10px; border-radius: 6px;
      background: rgba(14, 165, 233, 0.12); color: #7dd3fc;
      font-size: 12px; font-weight: 600;
    }

    /* === DURATION === */
    .duration-range {
      display: flex; align-items: center; gap: 6px;
      font-size: 13px; color: #94a3b8;
    }
    .arrow-icon { font-size: 14px; width: 14px; height: 14px; color: #475569; }

    /* === STATUS PILL === */
    .status-pill {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 5px 12px; border-radius: 20px;
      font-size: 12px; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .status-dot {
      width: 7px; height: 7px; border-radius: 50%;
      display: inline-block;
    }
    .pill-active { background: rgba(16, 185, 129, 0.12); color: #34d399; }
    .pill-active .status-dot { background: #34d399; }
    .pill-completed { background: rgba(99, 102, 241, 0.12); color: #a5b4fc; }
    .pill-completed .status-dot { background: #a5b4fc; }
    .pill-dropped { background: rgba(239, 68, 68, 0.12); color: #f87171; }
    .pill-dropped .status-dot { background: #f87171; }

    /* === TASK PROGRESS === */
    .task-progress { display: flex; align-items: center; gap: 2px; justify-content: center; }
    .task-done { color: #34d399; font-weight: 700; font-size: 15px; }
    .task-sep { color: #475569; font-size: 13px; margin: 0 1px; }
    .task-total { color: #94a3b8; font-size: 13px; }

    /* === ACTION BUTTONS === */
    .col-actions { white-space: nowrap; }
    .action-btn {
      width: 34px; height: 34px; border-radius: 8px;
      border: 1px solid transparent; background: transparent;
      cursor: pointer; display: inline-flex;
      align-items: center; justify-content: center;
      transition: all 0.15s; margin: 0 2px;
    }
    .action-btn mat-icon { font-size: 18px; width: 18px; height: 18px; }

    .view-btn { color: #818cf8; }
    .view-btn:hover { background: rgba(99, 102, 241, 0.15); border-color: rgba(99, 102, 241, 0.3); }
    .delete-btn { color: #f87171; }
    .delete-btn:hover { background: rgba(239, 68, 68, 0.15); border-color: rgba(239, 68, 68, 0.3); }

    .text-muted { color: #475569; }

    /* === EMPTY STATE === */
    .empty-state-card {
      background: #1e293b; border: 1px solid #334155;
      border-radius: 12px; padding: 60px 40px;
      text-align: center;
    }
    .empty-state-card mat-icon {
      font-size: 56px; width: 56px; height: 56px;
      color: #334155; margin-bottom: 16px;
    }
    .empty-state-card h3 { font-size: 18px; font-weight: 600; color: #94a3b8; margin-bottom: 8px; }
    .empty-state-card p { color: #64748b; font-size: 14px; }

    /* === RESPONSIVE === */
    @media (max-width: 1024px) {
      .intern-table-wrap { overflow-x: auto; }
    }
    @media (max-width: 768px) {
      .filters-row { flex-direction: column; }
      .search-input-wrapper { min-width: 100%; }
      .filter-group { min-width: 100%; }
      .form-grid { grid-template-columns: 1fr; }
    }

    /* === ADD FORM === */
    .add-form-panel {
      background: #1e293b; border: 1px solid #334155;
      border-radius: 12px; padding: 24px; margin-bottom: 16px;
      animation: slideDown 0.2s ease-out;
    }
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .add-form-panel h3 {
      display: flex; align-items: center; gap: 8px;
      font-size: 16px; font-weight: 700; color: #f1f5f9;
      margin-bottom: 20px;
    }
    .add-form-panel h3 mat-icon { font-size: 20px; width: 20px; height: 20px; color: #818cf8; }
    .form-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 16px; margin-bottom: 20px;
    }
    .form-field { display: flex; flex-direction: column; gap: 6px; }
    .form-field label {
      font-size: 11px; font-weight: 600; color: #94a3b8;
      text-transform: uppercase; letter-spacing: 0.5px;
    }
    .form-input {
      padding: 10px 14px; background: #0f172a;
      border: 1px solid #334155; border-radius: 8px;
      color: #f1f5f9; font-size: 14px; font-family: inherit;
      outline: none; transition: border-color 0.2s;
    }
    .form-input:focus { border-color: #818cf8; }
    .form-input::placeholder { color: #475569; }
    .form-actions { display: flex; gap: 12px; }
    .btn-submit {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 10px 24px; border-radius: 8px; border: none;
      background: linear-gradient(135deg, #10b981, #059669);
      color: white; font-weight: 600; font-size: 14px;
      cursor: pointer; font-family: inherit; transition: all 0.2s;
    }
    .btn-submit:hover { transform: translateY(-1px); box-shadow: 0 4px 15px rgba(16,185,129,0.4); }
    .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
    .btn-cancel {
      padding: 10px 24px; border-radius: 8px;
      border: 1px solid #334155; background: transparent;
      color: #94a3b8; font-weight: 600; font-size: 14px;
      cursor: pointer; font-family: inherit; transition: all 0.2s;
    }
    .btn-cancel:hover { border-color: #64748b; color: #e2e8f0; }
  `]
})
export class InternListComponent implements OnInit {
  interns: Intern[] = [];
  batches: string[] = [];
  departments: string[] = [];
  searchQuery = '';
  statusFilter = '';
  batchFilter = '';
  deptFilter = '';
  loading = true;
  uploadResult: any = null;
  showAddForm = false;
  addingIntern = false;
  newIntern: any = this.emptyIntern();

  constructor(
    private internService: InternService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadInterns();
    this.internService.getFilters().subscribe(f => {
      this.batches = f.batches || [];
      this.departments = f.departments || [];
    });
  }

  emptyIntern(): any {
    return {
      internId: '', name: '', email: '', phone: '',
      college: '', department: '', batch: '',
      startDate: '', endDate: '', status: 'ACTIVE'
    };
  }

  loadInterns(): void {
    this.loading = true;
    this.internService.getAll().subscribe(data => {
      this.interns = data;
      this.loading = false;
    });
  }

  onSearch(): void {
    this.loading = true;
    this.internService.search({
      search: this.searchQuery, status: this.statusFilter,
      batch: this.batchFilter, department: this.deptFilter
    }).subscribe(data => {
      this.interns = data;
      this.loading = false;
    });
  }

  addIntern(): void {
    if (!this.newIntern.internId || !this.newIntern.name || !this.newIntern.email || !this.newIntern.startDate) {
      this.snackBar.open('Please fill all required fields (Intern ID, Name, Email, Start Date)', 'Close', { duration: 3000 });
      return;
    }
    this.addingIntern = true;
    this.internService.create(this.newIntern).subscribe({
      next: () => {
        this.snackBar.open('Intern added successfully!', 'Close', { duration: 3000 });
        this.showAddForm = false;
        this.newIntern = this.emptyIntern();
        this.addingIntern = false;
        this.loadInterns();
      },
      error: (err) => {
        this.addingIntern = false;
        const msg = err.error?.message || err.error?.error || 'Failed to add intern';
        this.snackBar.open(msg, 'Close', { duration: 4000 });
      }
    });
  }

  onFileUpload(event: any): void {
    const file = event.target.files[0];
    if (!file) return;
    this.internService.uploadExcel(file).subscribe({
      next: (result) => {
        this.uploadResult = result;
        this.loadInterns();
      },
      error: (err) => {
        this.snackBar.open('Upload failed: ' + (err.error?.message || 'Unknown error'), 'Close', { duration: 3000 });
      }
    });
  }

  viewProfile(intern: Intern): void {
    this.router.navigate(['/interns', intern.id]);
  }

  deleteIntern(intern: Intern): void {
    if (confirm(`Are you sure you want to delete intern "${intern.name}"? This will also remove their task assignments and attendance records.`)) {
      this.internService.delete(intern.id!).subscribe({
        next: () => {
          this.snackBar.open('Intern deleted successfully', 'Close', { duration: 3000 });
          this.interns = this.interns.filter(i => i.id !== intern.id);
        },
        error: (err) => {
          const msg = err.error?.message || 'Failed to delete intern';
          this.snackBar.open(msg, 'Close', { duration: 4000 });
        }
      });
    }
  }
}
