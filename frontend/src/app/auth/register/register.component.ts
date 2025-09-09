import { Component } from '@angular/core';
// Update the path below if your auth.service.ts is located elsewhere
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  user = {
    nominativo: '',
    email: '',
    password: '',
    telefono: ''
  };
  errorMessage: string = '';

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  onRegister() {
    const registerUser = {
      nominativo: this.user.nominativo,
      email: this.user.email,
      password: this.user.password,
      telefono: this.user.telefono
    };

    this.authService.register(registerUser).subscribe({
      next: (res: any) => {
        // registrazione riuscita → reindirizza al login
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.errorMessage = 'Errore nella registrazione, riprova';
      }
    });
  }
}
