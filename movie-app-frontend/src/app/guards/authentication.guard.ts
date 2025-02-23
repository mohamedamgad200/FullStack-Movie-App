import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isLoggedIn) {
    if (authService.isUser) {
      return true;
    } else {
      router.navigateByUrl('/');
      return false;
    }
  } else {
    router.navigateByUrl('/');
    return false;
  }
};
