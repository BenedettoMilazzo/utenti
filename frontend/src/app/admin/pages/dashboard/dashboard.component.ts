import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  cards = [
  {
    title: 'Statistiche',
    subtitle: 'Grafici e numeri chiave',
    icon: 'bi bi-bar-chart-line',
    borderClass: 'border-primary bg-light',
    
  },
  {
    title: 'Utenti',
    subtitle: 'Totale registrati',
    icon: 'bi bi-people',
    borderClass: 'border-success bg-light',
    
  },
  {
    title: 'Attività Recenti',
    subtitle: 'Ultime azioni utenti',
    icon: 'bi bi-clock-history',
    borderClass: 'border-warning bg-light',
    
  },
  {
    title: 'Impostazioni',
    subtitle: 'Accesso rapido',
    icon: 'bi bi-gear',
    borderClass: 'border-danger bg-light',
    link: '/settings'
  }
];

}
