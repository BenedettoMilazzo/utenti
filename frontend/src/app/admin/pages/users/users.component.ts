import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';
import { UsersService, Utente } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-utenti',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit, OnInit {
  
  utenti: Utente[] = [];
  nuovoUtente: Utente = { nominativo: '', email: '', telefono: '', ruolo: 'User' };
  
  constructor(private readonly usersService: UsersService) { }

  // Metodo eseguito dopo che la vista è stata inizializzata
  ngAfterViewInit(): void {
    // Inizializza DataTable sulla tabella con id #utentiTable
    ($('#utentiTable') as any).DataTable({
      paging: true,       // attiva la paginazione
      searching: true,    // attiva la ricerca
      ordering: true,     // attiva l'ordinamento
      info: true,         // mostra info tipo "Mostrando 1 a 10 di 50 utenti"
      lengthChange: false // disabilita il cambio del numero di righe per pagina
    });
  }

  ngOnInit(): void {
    this.caricaUtenti();
  }

  caricaUtenti() {
  this.usersService.getUtenti().subscribe({
    next: data => {
      this.utenti = data;

      // Distruggi la vecchia DataTable se esiste
      const table = ($('#utentiTable') as any).DataTable();
      if (table) {
        table.destroy();
      }

      // Inizializza DataTable nuovamente
      setTimeout(() => {
        ($('#utentiTable') as any).DataTable({
          paging: true,
          searching: true,
          ordering: true,
          info: true,
          lengthChange: false
        });
      });
    },
    error: err => console.error('Errore caricamento utenti', err)
  });
}


  deleteUtente(utente: Utente) {
    if (confirm(`Vuoi eliminare l'utente ${utente.nominativo}?`)) {
      this.usersService.deleteUtente(utente.id!).subscribe(() => {
        this.caricaUtenti();
      });
    }
  }
}
