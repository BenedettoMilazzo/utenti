import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {
  userName: string | null = '';
  @Input() isSidebarOpen: boolean = true;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.authService.userName$.subscribe(name => this.userName = name);
  }

  logout() {
    this.authService.logout();
  }
}
