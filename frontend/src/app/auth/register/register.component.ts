import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, MatSelectModule, MatSnackBarModule, MatProgressSpinnerModule],
  template: `
    <div class="auth-container">
      <div class="auth-left">
        <div class="floating-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
        <div class="illustration-content">
          <mat-icon class="illustration-icon">group_add</mat-icon>
          <h2>Join MentorHub</h2>
          <p>Create your account and start managing</p>
        </div>
      </div>

      <div class="auth-right">
        <div class="auth-form-wrapper">
          <div class="auth-header">
            <h1>Create Account</h1>
            <p>Fill in the details to get started</p>
          </div>

          <form (ngSubmit)="onRegister()" class="auth-form">
            <mat-form-field appearance="outline">
              <mat-label>Full Name</mat-label>
              <input matInput [(ngModel)]="fullName" name="fullName" required>
              <mat-icon matPrefix>badge</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Username</mat-label>
              <input matInput [(ngModel)]="username" name="username" required>
              <mat-icon matPrefix>person</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput [(ngModel)]="email" name="email" type="email" required>
              <mat-icon matPrefix>email</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Password</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'"
                     [(ngModel)]="password" name="password" required>
              <mat-icon matPrefix>lock</mat-icon>
              <button mat-icon-button matSuffix type="button" (click)="hidePassword = !hidePassword">
                <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
              </button>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Role</mat-label>
              <mat-select [(ngModel)]="role" name="role">
                <mat-option value="MENTOR">Mentor / Admin</mat-option>
                <mat-option value="INTERN">Intern</mat-option>
              </mat-select>
              <mat-icon matPrefix>work</mat-icon>
            </mat-form-field>

            <button mat-raised-button class="btn-primary login-btn" type="submit" [disabled]="loading">
              <mat-spinner *ngIf="loading" diameter="20"></mat-spinner>
              <span *ngIf="!loading">Create Account</span>
            </button>
          </form>

          <div class="auth-footer">
            <span>Already have an account?</span>
            <a routerLink="/login">Sign In</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container { display: flex; height: 100vh; background: var(--bg-dark); }
    .auth-left {
      flex: 1; display: flex; align-items: center; justify-content: center;
      background: linear-gradient(135deg, #1e3a5f, #0f766e, #1e1b4b);
      position: relative; overflow: hidden;
    }
    .floating-shapes { position: absolute; inset: 0; }
    .shape { position: absolute; border-radius: 50%; opacity: 0.1; animation: float 6s ease-in-out infinite; }
    .shape-1 { width: 300px; height: 300px; background: var(--success); top: 10%; left: 10%; }
    .shape-2 { width: 200px; height: 200px; background: var(--primary); bottom: 20%; right: 10%; animation-delay: -2s; }
    .shape-3 { width: 150px; height: 150px; background: var(--secondary); top: 60%; left: 50%; animation-delay: -4s; }
    @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
    .illustration-content { text-align: center; z-index: 1; position: relative; }
    .illustration-icon { font-size: 80px; width: 80px; height: 80px; color: white; margin-bottom: 16px; }
    .illustration-content h2 { font-size: 36px; font-weight: 800; color: white; }
    .illustration-content p { color: rgba(255,255,255,0.7); font-size: 16px; margin-top: 8px; }
    .auth-right {
      flex: 1; display: flex; align-items: center; justify-content: center;
      overflow-y: auto; background: #0f172a;
    }
    .auth-form-wrapper {
      width: 100%; max-width: 420px; padding: 40px;
      background: #1e293b; border-radius: 16px;
      border: 1px solid #334155; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }
    .auth-header h1 { font-size: 28px; font-weight: 700; margin-bottom: 4px; color: #f1f5f9; }
    .auth-header p { color: #94a3b8; margin-bottom: 24px; }
    .auth-form { display: flex; flex-direction: column; gap: 4px; }
    .auth-form input { color: #f1f5f9 !important; }
    .auth-form mat-icon { color: #94a3b8 !important; }
    .login-btn { height: 48px; font-size: 16px; margin-top: 8px; width: 100%; }
    .auth-footer { text-align: center; margin-top: 24px; color: #94a3b8; }
    .auth-footer a { color: #818cf8; text-decoration: none; font-weight: 600; margin-left: 4px; }
    @media (max-width: 768px) { .auth-left { display: none; } .auth-right { padding: 20px; } }
  `]
})
export class RegisterComponent {
  fullName = '';
  username = '';
  email = '';
  password = '';
  role = 'MENTOR';
  hidePassword = true;
  loading = false;

  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  onRegister(): void {
    if (!this.fullName || !this.username || !this.email || !this.password) return;
    this.loading = true;
    this.auth.register({
      fullName: this.fullName, username: this.username,
      email: this.email, password: this.password, role: this.role
    }).subscribe({
      next: (user) => {
        this.loading = false;
        this.snackBar.open('Account created successfully!', 'Close', { duration: 3000 });
        this.router.navigate([user.role === 'MENTOR' ? '/dashboard' : '/my-tasks']);
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open(err.error?.message || 'Registration failed', 'Close', { duration: 3000 });
      }
    });
  }
}
