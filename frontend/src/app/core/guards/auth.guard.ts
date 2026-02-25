import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (authService.isLoggedIn) return true;
    router.navigate(['/login']);
    return false;
};

export const mentorGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (authService.isLoggedIn && authService.isMentor) return true;
    router.navigate(['/login']);
    return false;
};

export const internGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (authService.isLoggedIn && !authService.isMentor) return true;
    router.navigate(['/login']);
    return false;
};
