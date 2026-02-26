import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  standalone: true,
  imports: [  CommonModule, FormsModule ],
  selector: 'page-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginPage {
  email = '';
  password = '';
  error = '';
 
  constructor(private auth: AuthService, private router: Router) {}
 
  login() {
    if (this.auth.login(this.email, this.password)) {
      // success -> go to dashboard
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Invalid credentials';
    }
  }
}