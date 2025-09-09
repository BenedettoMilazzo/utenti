import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';
import { UsersService, Utente } from 'src/app/core/services/users.service';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@Component({
  selector: 'app-utenti',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit, OnInit {
  
  utenti: Utente[] = [];
  nuovoUtente: Utente = { nominativo: '', email: '', password: '', telefono: '', ruolo: 'user' };
  
  @ViewChild(AddUserComponent) addUserModal!: AddUserComponent;
  @ViewChild('editUserModal') editUserModal!: EditUserComponent;

  selectedUser!: Utente; // 🔹 utente selezionato per modifica

  constructor(private readonly usersService: UsersService) { }

  ngAfterViewInit(): void {
    ($('#utentiTable') as any).DataTable({
      paging: true,
      searching: true,
      ordering: true,
      info: true,
      lengthChange: false
    });
  }

  ngOnInit(): void {
    this.caricaUtenti();
  }

  caricaUtenti() {
    this.usersService.getUtenti().subscribe({
      next: data => {
        this.utenti = data;

        const table = ($('#utentiTable') as any).DataTable();
        if (table) table.destroy();

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

  openModal() {
    this.addUserModal.open();
  }

  // 🔹 Metodo completo per aprire la modale EditUser
  openEditModal(utente: Utente) {
    if (!utente.id) {
      console.error('Utente senza ID:', utente);
      return;
    }

    // Copia l'utente selezionato per evitare effetti collaterali
    this.selectedUser = { ...utente };

    // La modale si aprirà automaticamente nel figlio tramite ngOnChanges
  }

  deleteUtente(utente: Utente) {
    if (confirm(`Vuoi eliminare l'utente ${utente.nominativo}?`)) {
      this.usersService.deleteUtente(utente.id!).subscribe(() => {
        this.caricaUtenti();
      });
    }
  }
}
