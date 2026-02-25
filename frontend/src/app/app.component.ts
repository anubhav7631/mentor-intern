import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from './core/services/auth.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive,
    MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule, MatButtonModule, MatMenuModule],
  template: `
    <div class="app-container" *ngIf="auth.isLoggedIn; else authLayout">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-brand">
          <div class="brand-icon">
            <mat-icon>school</mat-icon>
          </div>
          <div class="brand-text">
            <span class="brand-name">MentorHub</span>
            <span class="brand-sub">Management System</span>
          </div>
        </div>

        <nav class="sidebar-nav">
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
            <mat-icon>dashboard</mat-icon>
            <span>Dashboard</span>
          </a>
          <a *ngIf="auth.isMentor" routerLink="/interns" routerLinkActive="active" class="nav-item">
            <mat-icon>people</mat-icon>
            <span>Interns</span>
          </a>
          <a routerLink="/tasks" routerLinkActive="active" class="nav-item">
            <mat-icon>assignment</mat-icon>
            <span>Tasks</span>
          </a>
          <a *ngIf="!auth.isMentor" routerLink="/my-tasks" routerLinkActive="active" class="nav-item">
            <mat-icon>task_alt</mat-icon>
            <span>My Tasks</span>
          </a>
          <a *ngIf="auth.isMentor" routerLink="/reports" routerLinkActive="active" class="nav-item">
            <mat-icon>assessment</mat-icon>
            <span>Reports</span>
          </a>
          <a *ngIf="auth.isMentor" routerLink="/attendance" routerLinkActive="active" class="nav-item">
            <mat-icon>fact_check</mat-icon>
            <span>Attendance</span>
          </a>
          <a *ngIf="!auth.isMentor" routerLink="/my-attendance" routerLinkActive="active" class="nav-item">
            <mat-icon>fact_check</mat-icon>
            <span>My Attendance</span>
          </a>
        </nav>

        <div class="sidebar-footer">
          <div class="user-info" [matMenuTriggerFor]="userMenu">
            <div class="user-avatar">
              <img *ngIf="getProfilePicUrl()" [src]="getProfilePicUrl()" class="sidebar-avatar-img" alt="">
              <span *ngIf="!getProfilePicUrl()">{{ auth.currentUser?.fullName?.charAt(0) || 'U' }}</span>
            </div>
            <div class="user-details">
              <span class="user-name">{{ auth.currentUser?.fullName }}</span>
              <span class="user-role">{{ auth.currentUser?.role }}</span>
            </div>
            <mat-icon>expand_more</mat-icon>
          </div>
          <mat-menu #userMenu="matMenu">
            <button mat-menu-item (click)="goToProfile()">
              <mat-icon>person</mat-icon>
              <span>My Profile</span>
            </button>
            <button mat-menu-item (click)="logout()">
              <mat-icon>logout</mat-icon>
              <span>Sign Out</span>
            </button>
          </mat-menu>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>

    <ng-template #authLayout>
      <router-outlet></router-outlet>
    </ng-template>
  `,
  styles: [`
    .app-container {
      display: flex;
      height: 100vh;
      overflow: hidden;
    }

    .sidebar {
      width: 260px;
      background: #111827;
      border-right: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
    }

    .sidebar-brand {
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1px solid var(--border);
    }

    .brand-icon {
      width: 42px;
      height: 42px;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .brand-icon mat-icon { color: white; font-size: 22px; }

    .brand-text { display: flex; flex-direction: column; }
    .brand-name { font-weight: 700; font-size: 16px; color: var(--text-primary); }
    .brand-sub { font-size: 11px; color: var(--text-muted); }

    .sidebar-nav {
      flex: 1;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      overflow-y: auto;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border-radius: var(--radius-sm);
      color: var(--text-secondary);
      text-decoration: none;
      transition: all 0.2s;
      font-weight: 500;
      font-size: 14px;
    }

    .nav-item:hover {
      background: var(--bg-surface);
      color: var(--text-primary);
    }

    .nav-item.active {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(14, 165, 233, 0.1));
      color: var(--primary-light);
      border-left: 3px solid var(--primary);
    }

    .nav-item mat-icon { font-size: 20px; width: 20px; height: 20px; }

    .sidebar-footer {
      padding: 12px;
      border-top: 1px solid var(--border);
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: background 0.2s;
    }

    .user-info:hover { background: var(--bg-surface); }

    .user-avatar {
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 14px;
      color: white;
      overflow: hidden;
      flex-shrink: 0;
    }

    .sidebar-avatar-img {
      width: 100%; height: 100%; object-fit: cover;
    }

    .user-details { flex: 1; display: flex; flex-direction: column; }
    .user-name { font-weight: 600; font-size: 13px; }
    .user-role { font-size: 11px; color: var(--text-muted); }

    .main-content {
      flex: 1;
      overflow-y: auto;
      background: var(--bg-dark);
    }
  `]
})
export class AppComponent {
  private backendUrl = environment.apiUrl.replace('/api', '');

  constructor(public auth: AuthService, private router: Router) { }

  getProfilePicUrl(): string | null {
    const stored = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return stored.profilePicture ? this.backendUrl + stored.profilePicture : null;
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
