import { Routes } from '@angular/router';
import { authGuard, mentorGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [authGuard]
    },
    {
        path: 'interns',
        loadComponent: () => import('./interns/intern-list/intern-list.component').then(m => m.InternListComponent),
        canActivate: [mentorGuard]
    },
    {
        path: 'interns/:id',
        loadComponent: () => import('./interns/intern-profile/intern-profile.component').then(m => m.InternProfileComponent),
        canActivate: [authGuard]
    },
    {
        path: 'tasks',
        loadComponent: () => import('./tasks/task-list/task-list.component').then(m => m.TaskListComponent),
        canActivate: [authGuard]
    },
    {
        path: 'tasks/create',
        loadComponent: () => import('./tasks/task-create/task-create.component').then(m => m.TaskCreateComponent),
        canActivate: [mentorGuard]
    },
    {
        path: 'tasks/:id',
        loadComponent: () => import('./tasks/task-detail/task-detail.component').then(m => m.TaskDetailComponent),
        canActivate: [authGuard]
    },
    {
        path: 'reports',
        loadComponent: () => import('./reports/reports.component').then(m => m.ReportsComponent),
        canActivate: [mentorGuard]
    },
    {
        path: 'my-tasks',
        loadComponent: () => import('./intern-portal/intern-tasks.component').then(m => m.InternTasksComponent),
        canActivate: [authGuard]
    },
    {
        path: 'profile',
        loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard]
    },
    {
        path: 'attendance',
        loadComponent: () => import('./attendance/mentor-attendance.component').then(m => m.MentorAttendanceComponent),
        canActivate: [mentorGuard]
    },
    {
        path: 'my-attendance',
        loadComponent: () => import('./attendance/intern-attendance.component').then(m => m.InternAttendanceComponent),
        canActivate: [authGuard]
    },
    { path: '**', redirectTo: '/login' }
];
