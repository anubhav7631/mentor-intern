import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatCardModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatProgressSpinnerModule],
  template: `
    <div class="auth-container">
      <div class="auth-left">
        <div class="auth-illustration">
          <div class="floating-shapes">
            <div class="shape shape-1"></div>
            <div class="shape shape-2"></div>
            <div class="shape shape-3"></div>
          </div>
          <div class="illustration-content">
            <mat-icon class="illustration-icon">school</mat-icon>
            <h2>MentorHub</h2>
            <p>Enterprise Mentor-Intern Management System</p>
          </div>
        </div>
      </div>

      <div class="auth-right">
        <div class="auth-form-wrapper">
          <div class="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your account to continue</p>
          </div>

          <form (ngSubmit)="onLogin()" class="auth-form">
            <mat-form-field appearance="outline">
              <mat-label>Username</mat-label>
              <input matInput [(ngModel)]="username" name="username" required>
              <mat-icon matPrefix>person</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Password</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'"
                     [(ngModel)]="password" name="password" required>
              <mat-icon matPrefix>lock</mat-icon>
              <button mat-icon-button matSuffix type="button"
                      (click)="hidePassword = !hidePassword">
                <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
              </button>
            </mat-form-field>

            <button mat-raised-button class="btn-primary login-btn" type="submit" [disabled]="loading">
              <mat-spinner *ngIf="loading" diameter="20"></mat-spinner>
              <span *ngIf="!loading">Sign In</span>
            </button>
          </form>

          <div class="auth-footer">
            <span>Don't have an account?</span>
            <a routerLink="/register">Create Account</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      height: 100vh;
      background: var(--bg-dark);
    }

    .auth-left {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #1e1b4b, #312e81, #1e3a5f);
      position: relative;
      overflow: hidden;
    }

    .floating-shapes { position: absolute; inset: 0; }

    .shape {
      position: absolute;
      border-radius: 50%;
      opacity: 0.1;
      animation: float 6s ease-in-out infinite;
    }
    .shape-1 { width: 300px; height: 300px; background: var(--primary); top: 10%; left: 10%; }
    .shape-2 { width: 200px; height: 200px; background: var(--secondary); bottom: 20%; right: 10%; animation-delay: -2s; }
    .shape-3 { width: 150px; height: 150px; background: var(--accent); top: 60%; left: 50%; animation-delay: -4s; }

    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(5deg); }
    }

    .illustration-content {
      text-align: center;
      z-index: 1;
      position: relative;
    }

    .illustration-icon {
      font-size: 80px;
      width: 80px;
      height: 80px;
      color: white;
      margin-bottom: 16px;
    }

    .illustration-content h2 {
      font-size: 36px;
      font-weight: 800;
      color: white;
    }

    .illustration-content p {
      color: rgba(255, 255, 255, 0.7);
      font-size: 16px;
      margin-top: 8px;
    }

    .auth-right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0f172a;
    }

    .auth-form-wrapper {
      width: 100%;
      max-width: 420px;
      padding: 40px;
      background: #1e293b;
      border-radius: 16px;
      border: 1px solid #334155;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }

    .auth-header h1 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 4px;
      color: #f1f5f9;
    }

    .auth-header p {
      color: #94a3b8;
      margin-bottom: 32px;
    }

    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    /* Ensure form fields are visible on the card */
    .auth-form input {
      color: #f1f5f9 !important;
    }
    .auth-form mat-icon {
      color: #94a3b8 !important;
    }

    .login-btn {
      height: 48px;
      font-size: 16px;
      margin-top: 8px;
      width: 100%;
    }

    .auth-footer {
      text-align: center;
      margin-top: 24px;
      color: #94a3b8;
    }

    .auth-footer a {
      color: #818cf8;
      text-decoration: none;
      font-weight: 600;
      margin-left: 4px;
    }

    @media (max-width: 768px) {
      .auth-left { display: none; }
      .auth-right { padding: 20px; }
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  hidePassword = true;
  loading = false;

  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  onLogin(): void {
    if (!this.username || !this.password) {
      this.snackBar.open('Please enter both username and password', 'Close', { duration: 3000 });
      return;
    }
    this.loading = true;
    this.auth.login(this.username, this.password).subscribe({
      next: (user) => {
        this.loading = false;
        if (user.role === 'MENTOR') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/my-tasks']);
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('Login error:', err);
        const msg = err.status === 401 ? 'Invalid username or password' :
          err.status === 0 ? 'Cannot connect to server. Is the backend running?' :
            'Login failed. Please try again.';
        this.snackBar.open(msg, 'Close', { duration: 4000 });
      }
    });
  }
}
