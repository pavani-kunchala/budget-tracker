 import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
@Component({
  standalone: true,
  selector: 'page-signup',
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
  imports: [ CommonModule, FormsModule ]
})
export class SignupPage {
  email = '';
  password = '';
  error = '';   // 👈 declare error property

  constructor(private auth: AuthService, private router: Router) {}
 
  register() {
    if (!this.email || !this.password) {
      alert('Enter email & password');
      return;
    }

    // If signup returns boolean (true/false)
    const result = this.auth.signup({ email: this.email, password: this.password });

    if (result) {
      alert('Registration successful! Please log in.');
      this.router.navigate(['/login']); // 👈 go to login page
    } else {
      this.error = 'Signup failed';
    }
  }
}
