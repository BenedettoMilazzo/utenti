import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userName$: Observable<string | null>;
  loggedIn$: Observable<boolean>;

  constructor(private readonly authService: AuthService) {
    this.userName$ = this.authService.userName$;
    this.loggedIn$ = this.authService.loggedIn$;
  }

  logout() {
    this.authService.logout();
  }
}
