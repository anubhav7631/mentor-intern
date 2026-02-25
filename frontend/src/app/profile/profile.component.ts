import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../core/services/auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule,
    MatSnackBarModule, MatProgressSpinnerModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>My Profile</h1>
        <p>View and update your account information</p>
      </div>

      <div *ngIf="loading" class="loading-state"><mat-spinner diameter="40"></mat-spinner></div>

      <div *ngIf="!loading" class="profile-layout">
        <!-- Profile Card -->
        <div class="profile-card">
          <!-- Profile Picture -->
          <div class="avatar-section">
            <div class="avatar-wrapper" (click)="pictureInput.click()">
              <img *ngIf="profilePictureUrl" [src]="profilePictureUrl" class="avatar-img" alt="Profile">
              <div *ngIf="!profilePictureUrl" class="avatar-placeholder">
                {{ profile.fullName?.charAt(0)?.toUpperCase() || 'U' }}
              </div>
              <div class="avatar-overlay">
                <mat-icon>photo_camera</mat-icon>
              </div>
            </div>
            <input #pictureInput type="file" accept="image/*" (change)="onPictureSelect($event)" hidden>
            <div class="avatar-actions">
              <button class="btn-sm btn-outline" (click)="pictureInput.click()">
                <mat-icon>upload</mat-icon> Change Photo
              </button>
              <button *ngIf="profilePictureUrl" class="btn-sm btn-danger-outline" (click)="removePicture()">
                <mat-icon>delete</mat-icon> Remove
              </button>
            </div>
            <small class="upload-hint">Max 5MB · JPG, PNG, GIF</small>
          </div>

          <h2 class="profile-name">{{ profile.fullName }}</h2>
          <span class="role-pill">{{ profile.role }}</span>
          <div class="profile-meta">
            <div class="meta-row"><mat-icon>person</mat-icon> <span>{{ profile.username }}</span></div>
            <div class="meta-row"><mat-icon>email</mat-icon> <span>{{ profile.email }}</span></div>
            <div class="meta-row" *ngIf="profile.createdAt"><mat-icon>calendar_today</mat-icon> <span>Joined {{ profile.createdAt | date:'mediumDate' }}</span></div>
          </div>
        </div>

        <!-- Forms -->
        <div class="forms-column">
          <!-- Edit Profile -->
          <div class="form-card">
            <h3><mat-icon>edit</mat-icon> Edit Profile</h3>
            <form (ngSubmit)="updateProfile()" class="profile-form">
              <div class="form-group">
                <label>Full Name</label>
                <input class="form-input" [(ngModel)]="profile.fullName" name="fullName" required>
              </div>
              <div class="form-group">
                <label>Email Address</label>
                <input class="form-input" [(ngModel)]="profile.email" name="email" type="email" required>
              </div>
              <div class="form-group">
                <label>Username</label>
                <input class="form-input" [value]="profile.username" disabled>
                <small class="hint">Username cannot be changed</small>
              </div>
              <button class="btn-primary submit-btn" type="submit" [disabled]="saving">
                <mat-spinner *ngIf="saving" diameter="18"></mat-spinner>
                <span *ngIf="!saving">Save Changes</span>
              </button>
            </form>
          </div>

          <!-- Change Password -->
          <div class="form-card">
            <h3><mat-icon>lock</mat-icon> Change Password</h3>
            <form (ngSubmit)="changePassword()" class="profile-form">
              <div class="form-group">
                <label>Current Password</label>
                <div class="password-wrap">
                  <input class="form-input" [(ngModel)]="currentPassword" name="currentPassword"
                         [type]="showCurrent ? 'text' : 'password'" required>
                  <button type="button" class="toggle-pw" (click)="showCurrent = !showCurrent">
                    <mat-icon>{{ showCurrent ? 'visibility_off' : 'visibility' }}</mat-icon>
                  </button>
                </div>
              </div>
              <div class="form-group">
                <label>New Password</label>
                <div class="password-wrap">
                  <input class="form-input" [(ngModel)]="newPassword" name="newPassword"
                         [type]="showNew ? 'text' : 'password'" required minlength="6">
                  <button type="button" class="toggle-pw" (click)="showNew = !showNew">
                    <mat-icon>{{ showNew ? 'visibility_off' : 'visibility' }}</mat-icon>
                  </button>
                </div>
              </div>
              <div class="form-group">
                <label>Confirm New Password</label>
                <div class="password-wrap">
                  <input class="form-input" [(ngModel)]="confirmPassword" name="confirmPassword"
                         [type]="showConfirm ? 'text' : 'password'" required>
                  <button type="button" class="toggle-pw" (click)="showConfirm = !showConfirm">
                    <mat-icon>{{ showConfirm ? 'visibility_off' : 'visibility' }}</mat-icon>
                  </button>
                </div>
                <small class="hint error-hint" *ngIf="confirmPassword && newPassword !== confirmPassword">
                  Passwords do not match
                </small>
              </div>
              <button class="btn-primary submit-btn" type="submit"
                      [disabled]="changingPw || !currentPassword || !newPassword || newPassword !== confirmPassword">
                <mat-spinner *ngIf="changingPw" diameter="18"></mat-spinner>
                <span *ngIf="!changingPw">Change Password</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .loading-state { display: flex; justify-content: center; padding: 60px; }

    .profile-layout {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 24px;
      align-items: start;
    }

    /* === PROFILE CARD === */
    .profile-card {
      background: #1e293b; border: 1px solid #334155;
      border-radius: 16px; padding: 32px;
      text-align: center;
    }

    /* === AVATAR SECTION === */
    .avatar-section {
      display: flex; flex-direction: column; align-items: center;
      margin-bottom: 16px;
    }
    .avatar-wrapper {
      width: 100px; height: 100px; border-radius: 50%;
      position: relative; cursor: pointer;
      overflow: hidden; margin-bottom: 12px;
      border: 3px solid #334155;
      transition: border-color 0.2s;
    }
    .avatar-wrapper:hover { border-color: #818cf8; }
    .avatar-wrapper:hover .avatar-overlay { opacity: 1; }

    .avatar-img {
      width: 100%; height: 100%; object-fit: cover;
    }
    .avatar-placeholder {
      width: 100%; height: 100%;
      background: linear-gradient(135deg, #6366f1, #0ea5e9);
      display: flex; align-items: center; justify-content: center;
      font-size: 36px; font-weight: 800; color: white;
    }
    .avatar-overlay {
      position: absolute; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transition: opacity 0.2s;
    }
    .avatar-overlay mat-icon { color: white; font-size: 28px; width: 28px; height: 28px; }

    .avatar-actions { display: flex; gap: 8px; margin-bottom: 6px; flex-wrap: wrap; justify-content: center; }

    .btn-sm {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 6px 12px; border-radius: 6px; font-size: 12px;
      font-weight: 600; cursor: pointer; transition: all 0.15s;
      border: 1px solid; background: transparent; font-family: inherit;
    }
    .btn-sm mat-icon { font-size: 14px; width: 14px; height: 14px; }
    .btn-outline { color: #818cf8; border-color: rgba(99, 102, 241, 0.3); }
    .btn-outline:hover { background: rgba(99, 102, 241, 0.1); }
    .btn-danger-outline { color: #f87171; border-color: rgba(239, 68, 68, 0.3); }
    .btn-danger-outline:hover { background: rgba(239, 68, 68, 0.1); }

    .upload-hint { font-size: 11px; color: #475569; }

    .profile-name { font-size: 20px; font-weight: 700; color: #f1f5f9; margin-bottom: 8px; }
    .role-pill {
      display: inline-block;
      padding: 4px 14px; border-radius: 20px;
      background: rgba(99, 102, 241, 0.15); color: #a5b4fc;
      font-size: 12px; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.5px; margin-bottom: 24px;
    }
    .profile-meta { text-align: left; }
    .meta-row {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 0; border-bottom: 1px solid #334155;
      color: #94a3b8; font-size: 14px;
    }
    .meta-row:last-child { border-bottom: none; }
    .meta-row mat-icon { font-size: 18px; width: 18px; height: 18px; color: #64748b; }

    /* === FORMS COLUMN === */
    .forms-column { display: flex; flex-direction: column; gap: 24px; }

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
    .form-input:disabled { opacity: 0.5; cursor: not-allowed; }

    .hint { font-size: 12px; color: #64748b; }
    .error-hint { color: #f87171; }

    .password-wrap { position: relative; }
    .password-wrap .form-input { padding-right: 44px; }
    .toggle-pw {
      position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
      background: none; border: none; cursor: pointer; padding: 4px;
    }
    .toggle-pw mat-icon { font-size: 20px; width: 20px; height: 20px; color: #64748b; }

    .submit-btn {
      display: flex; align-items: center; justify-content: center; gap: 8px;
      height: 44px; font-size: 14px; margin-top: 4px;
    }

    @media (max-width: 768px) {
      .profile-layout { grid-template-columns: 1fr; }
    }
  `]
})
export class ProfileComponent implements OnInit {
  profile: any = {};
  loading = true;
  saving = false;
  changingPw = false;
  profilePictureUrl: string | null = null;

  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  showCurrent = false;
  showNew = false;
  showConfirm = false;

  private apiUrl = `${environment.apiUrl}/profile`;
  private backendUrl = environment.apiUrl.replace('/api', '');

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.loading = true;
    this.http.get(this.apiUrl).subscribe({
      next: (data: any) => {
        this.profile = data;
        this.updatePictureUrl(data.profilePicture);
        this.loading = false;
      },
      error: () => {
        const u = this.auth.currentUser;
        this.profile = {
          username: u?.username,
          email: u?.email,
          fullName: u?.fullName,
          role: u?.role
        };
        this.loading = false;
      }
    });
  }

  updatePictureUrl(path: string | null): void {
    if (path && path.length > 0) {
      this.profilePictureUrl = this.backendUrl + path;
      // Also update local storage so sidebar can show it
      const stored = JSON.parse(localStorage.getItem('currentUser') || '{}');
      stored.profilePicture = path;
      localStorage.setItem('currentUser', JSON.stringify(stored));
    } else {
      this.profilePictureUrl = null;
    }
  }

  onPictureSelect(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    // Client-side validation
    if (!file.type.startsWith('image/')) {
      this.snackBar.open('Please select an image file', 'Close', { duration: 3000 });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      this.snackBar.open('File size must be less than 5MB', 'Close', { duration: 3000 });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    this.http.post<any>(`${this.apiUrl}/picture`, formData).subscribe({
      next: (res) => {
        this.snackBar.open('Profile picture updated!', 'Close', { duration: 3000 });
        this.updatePictureUrl(res.profilePicture);
      },
      error: (err) => {
        this.snackBar.open(err.error?.message || 'Failed to upload picture', 'Close', { duration: 3000 });
      }
    });

    // Reset input so same file can be selected again
    event.target.value = '';
  }

  removePicture(): void {
    this.http.delete<any>(`${this.apiUrl}/picture`).subscribe({
      next: () => {
        this.snackBar.open('Profile picture removed', 'Close', { duration: 3000 });
        this.profilePictureUrl = null;
        const stored = JSON.parse(localStorage.getItem('currentUser') || '{}');
        delete stored.profilePicture;
        localStorage.setItem('currentUser', JSON.stringify(stored));
      },
      error: () => {
        this.snackBar.open('Failed to remove picture', 'Close', { duration: 3000 });
      }
    });
  }

  updateProfile(): void {
    this.saving = true;
    this.http.put(this.apiUrl, {
      fullName: this.profile.fullName,
      email: this.profile.email
    }).subscribe({
      next: (res: any) => {
        this.saving = false;
        this.snackBar.open('Profile updated successfully!', 'Close', { duration: 3000 });
        const stored = JSON.parse(localStorage.getItem('currentUser') || '{}');
        stored.fullName = this.profile.fullName;
        stored.email = this.profile.email;
        localStorage.setItem('currentUser', JSON.stringify(stored));
      },
      error: (err) => {
        this.saving = false;
        this.snackBar.open(err.error?.message || 'Failed to update profile', 'Close', { duration: 3000 });
      }
    });
  }

  changePassword(): void {
    if (this.newPassword !== this.confirmPassword) return;
    this.changingPw = true;
    this.http.put(`${this.apiUrl}/password`, {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    }).subscribe({
      next: (res: any) => {
        this.changingPw = false;
        this.snackBar.open('Password changed successfully!', 'Close', { duration: 3000 });
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      },
      error: (err) => {
        this.changingPw = false;
        this.snackBar.open(err.error?.message || 'Failed to change password', 'Close', { duration: 3000 });
      }
    });
  }
}
