import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() isOpen: boolean = true;
  
  menuItems = [
    { label: 'Dashboard', icon: 'fas fa-chart-line', route: '/admin/dashboard' },
    { label: 'Utenti', icon: 'fas fa-users', route: '/admin/users' },
    { label: 'Impostazioni', icon: 'fas fa-cog', route: '/admin/settings' }
  ];

  constructor(private readonly router: Router) {}

  isActive(route: string) {
    return this.router.url === route;
  }
}
