import { Component, ViewChild, ElementRef, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsersService, Utente } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnChanges {
  @Input() utente!: Utente; // utente da modificare
  @ViewChild('modal') modal!: ElementRef<HTMLDivElement>;
  @Output() utenteAggiornato = new EventEmitter<void>();

  utenteModificato: Utente = { nominativo: '', email: '', password: '', telefono: '', ruolo: 'user' };
  private bootstrapModal!: any; // ❗ salva l'istanza di bootstrap.Modal

  constructor(private readonly usersService: UsersService, private readonly toastr: ToastrService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['utente'] && this.utente) {
      // copia valori per form
      this.utenteModificato = {
        id: this.utente.id,       // ❗ fondamentale
        nominativo: this.utente.nominativo,
        email: this.utente.email,
        telefono: this.utente.telefono,
        ruolo: this.utente.ruolo,
        password: ''              // reset password
      };

      // inizializza la modale una volta sola
      if (!this.bootstrapModal) {
        this.bootstrapModal = new (window as any).bootstrap.Modal(this.modal.nativeElement);
      }

      this.bootstrapModal.show();

      // focus sul primo input
      setTimeout(() => this.modal.nativeElement.querySelector('input')?.focus(), 100);
    }
  }

  open() {
    if (!this.bootstrapModal) {
      this.bootstrapModal = new (window as any).bootstrap.Modal(this.modal.nativeElement);
    }
    this.bootstrapModal.show();
    setTimeout(() => this.modal.nativeElement.querySelector('input')?.focus(), 100);
  }

  close() {
    if (this.bootstrapModal) {
      this.bootstrapModal.hide();
    }
  }

  onSubmit() {
    this.usersService.updateUtente(this.utenteModificato).subscribe({
      next: () => {
        this.toastr.success('Utente aggiornato con successo!', 'Successo');
        this.utenteAggiornato.emit(); // aggiorna la lista utenti nel componente padre
        this.close();                 // chiudi correttamente la modale
      },
      error: (err) => {
        console.error('Errore durante l\'aggiornamento', err);
        this.toastr.error('Si è verificato un errore durante l\'aggiornamento.', 'Errore');
      }
    });
  }
}
