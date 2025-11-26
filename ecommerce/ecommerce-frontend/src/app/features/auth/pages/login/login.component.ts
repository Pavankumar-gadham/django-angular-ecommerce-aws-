import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    const data = { username: this.username, password: this.password };
    this.auth.login(data).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (err) => (this.error = err.error.detail || 'Login failed'),
    });
  }
}
