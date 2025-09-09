import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // Questo servizio sarà disponibile in tutta l'app (singleton)
})
export class AuthService {
  // URL base delle API di autenticazione
  private readonly apiUrl = 'http://localhost:8000/api/auth';

  // Chiave con cui salviamo il token JWT in localStorage
  private readonly tokenKey = 'auth_token';

  // BehaviorSubject per lo stato di login: true se token presente, false altrimenti
  private readonly loggedInSubject = new BehaviorSubject<boolean>(!!localStorage.getItem(this.tokenKey));

  // BehaviorSubject per il nome utente; inizialmente preso da localStorage se presente
  private readonly userNameSubject = new BehaviorSubject<string | null>(localStorage.getItem('user_name'));

  // Espone i BehaviorSubject come Observable in sola lettura
  public loggedIn$ = this.loggedInSubject.asObservable();
  public userName$ = this.userNameSubject.asObservable();

  constructor(
    private readonly http: HttpClient,  // HttpClient per fare richieste HTTP
    private readonly router: Router,     // Router per navigare tra le pagine
    private readonly ngZone: NgZone      // NgZone per eseguire codice che aggiorna la UI
  ) {}

  // Genera gli headers per le richieste HTTP, incluso l'Authorization se il token è presente
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.tokenKey);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    if (token) headers = headers.set('Authorization', `Bearer ${token}`);
    return headers;
  }

  // Funzione per registrare un nuovo utente
  // Restituisce un Observable della risposta HTTP
  register(user: { nominativo: string; email: string; password: string; telefono: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user, { headers: this.getHeaders() });
  } 

  // Funzione per fare login
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => {
        if (res?.token) {
          // Salva il token in localStorage
          localStorage.setItem(this.tokenKey, res.token);

          // Prende il nominativo dall'utente restituito dalla API, fallback a "Utente"
          const userName = res.utente?.nominativo ?? 'Utente';
          localStorage.setItem('user_name', userName);

          // Aggiorna i BehaviorSubject così i componenti sottoscritti ricevono i valori
          this.userNameSubject.next(userName);
          this.loggedInSubject.next(true);
        }
      })
    );
  }

  // Logout: cancella token e dati utente, aggiorna BehaviorSubject e naviga al login
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('user_name');

    // Aggiorna gli observables
    this.loggedInSubject.next(false);
    this.userNameSubject.next(null);

    // Usa NgZone per essere sicuro che Angular aggiorni la UI durante la navigazione
    this.ngZone.run(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  // Controlla se l'utente è loggato leggendo dal localStorage
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
