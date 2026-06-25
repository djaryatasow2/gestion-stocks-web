import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Utilisateur {
  id: number;
  nom: string;
  email: string;
  role: string;
  entreprise: string;
  actif: boolean;
}

@Injectable({ providedIn: 'root' })
export class UtilisateurService {
  private url = 'http://localhost:8080/api/utilisateurs';
  constructor(private http: HttpClient) {}
  getAll(): Observable<Utilisateur[]> { return this.http.get<Utilisateur[]>(this.url); }
  create(u: Utilisateur): Observable<Utilisateur> { return this.http.post<Utilisateur>(this.url, u); }
  update(id: number, u: Utilisateur): Observable<Utilisateur> { return this.http.put<Utilisateur>(`${this.url}/${id}`, u); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.url}/${id}`); }
}