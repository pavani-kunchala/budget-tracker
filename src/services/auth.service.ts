import { Injectable } from '@angular/core';
 
@Injectable({ providedIn: 'root' })
export class AuthService {
  private USER_KEY = 'bt_user';      // stores registered user (simple)
  private LOGGED_KEY = 'bt_logged';  // stores login state
 
  signup(user: { email: string; password: string }) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    return true;
  }
 
  login(email: string, password: string) {
    const raw = localStorage.getItem(this.USER_KEY);
    if (!raw) return false;
    try {
      const user = JSON.parse(raw);
      if (user.email === email && user.password === password) {
        localStorage.setItem(this.LOGGED_KEY, 'true');
        return true;
      }
    } catch { /* ignore */ }
    return false;
  }
 
  logout() {
    localStorage.removeItem(this.LOGGED_KEY);
  }
 
  isLoggedIn(): boolean {
    return localStorage.getItem(this.LOGGED_KEY) === 'true';
  }
}