import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaccia Utente (puoi aggiungere altri campi)
export interface Utente {
  id?: number;
  nominativo: string;
  email: string;
  ruolo: string;
  telefono?: string;
  stato?: string;
  foto?: string;
}


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // Inserisci qui l'URL del tuo backend API
  private readonly apiUrl = 'http://localhost:8000/api/utenti';

  constructor(private readonly http: HttpClient) { }

  /** 🔹 Leggi tutti gli utenti */
getUtenti(): Observable<Utente[]> {
  return this.http.get<Utente[]>(`${this.apiUrl}/`);
}

/** 🔹 Aggiungi un nuovo utente */
addUtente(utente: Utente): Observable<Utente> {
  return this.http.post<Utente>(`${this.apiUrl}/add`, utente);
}

/** 🔹 Modifica un utente esistente */
updateUtente(utente: Utente): Observable<Utente> {
  if (!utente.id) throw new Error('ID utente mancante');
  return this.http.put<Utente>(`${this.apiUrl}/update/${utente.id}`, utente);
}

/** 🔹 Elimina un utente */
deleteUtente(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/delete/${id}`);
}

/** 🔹 Recupera un singolo utente */
getUtenteById(id: number): Observable<Utente> {
  return this.http.get<Utente>(`${this.apiUrl}/edit/${id}`);
}

}
