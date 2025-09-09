import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Utente, UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  nuovoUtente: Utente = { nominativo: '', email: '', password: '', telefono: '', ruolo: 'user' };

  @ViewChild('modal') modal!: ElementRef<HTMLDivElement>;
  @Output() utenteAggiunto = new EventEmitter<void>(); // 🔔 notifica al padre

  constructor(private readonly usersService: UsersService, private readonly toastr: ToastrService) {}

  open() {
    if (this.modal) {
      const modalEl = this.modal.nativeElement;
      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  close() {
    if (this.modal) {
      const modalEl = this.modal.nativeElement;
      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.hide();

      // Resetta i campi input
      this.nuovoUtente = { nominativo: '', email: '', password: '', telefono: '', ruolo: 'user' };
    }
  }

  onSubmit() {
    this.usersService.addUtente(this.nuovoUtente).subscribe({
      next: () => {
        // Mostra notifica
        this.toastr.success('Utente aggiunto correttamente!', 'Successo');

        // Resetta i campi
        this.nuovoUtente = { nominativo: '', email: '', password: '', telefono: '', ruolo: 'user' };

        // Avvisa il componente padre di aggiornare la lista
        this.utenteAggiunto.emit();

        // Chiudi la modale correttamente
        const modalEl = this.modal.nativeElement;
        const modalInstance = (window as any).bootstrap.Modal.getInstance(modalEl);
        if (modalInstance) {
          modalInstance.hide();
        }
      },
      error: (err) => {
        console.error('Errore durante il salvataggio utente', err);
        this.toastr.error('Si è verificato un errore durante il salvataggio.', 'Errore');
      }
    });
  }
}
