import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  role = 'customer';
  phone = '';
  error = '';
  success = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      this.success = '';
      return;
    }

    const data = {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role,
      phone: this.phone,
    };

    this.auth.register(data).subscribe({
      next: () => {
        this.success = 'Registration successful! Please login.';
        this.error = '';
        setTimeout(() => this.router.navigate(['/auth/login']), 2000);
      },
      error: (err) => {
        this.error = err.error.detail || 'Registration failed';
        this.success = '';
      },
    });
  }
}
