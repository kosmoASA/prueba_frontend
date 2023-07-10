import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const tokenGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuth = authService.isAuth();

  if( isAuth && router.isActive('login', true)) { // Corregir para lograr que borre el token cuando se ingresa un ruta desconocida y redirige al login
    authService.deleteToken();
  }

  return true;
};
