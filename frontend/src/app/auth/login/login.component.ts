import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  login() {
  this.authService.login({ email: this.email, password: this.password }).subscribe({
    next: res => {
      this.router.navigate(['/admin/dashboard']); // Redirect
    },
    error: (err: any) => {
      console.error('Login fallito', err);
      this.errorMessage = err.error?.message || 'Credenziali non valide';
    }
  });
}

}
