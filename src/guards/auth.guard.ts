// Angular 21 standalone-style guard using inject()
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
 
export const authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
 
  if (auth.isLoggedIn()) {
    return true;
  }
 
  // not logged => send to login
  router.navigate(['/login']);
  return false;
};


 