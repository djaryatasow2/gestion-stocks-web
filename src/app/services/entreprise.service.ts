import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Entreprise {
  id: number;
  nom: string;
  secteur: string;
  contact: string;
  nombreUtilisateurs: number;
  active: boolean;
}

@Injectable({ providedIn: 'root' })
export class EntrepriseService {
  private url = 'http://localhost:8080/api/entreprises';
  constructor(private http: HttpClient) {}
  getAll(): Observable<Entreprise[]> { return this.http.get<Entreprise[]>(this.url); }
  create(e: Entreprise): Observable<Entreprise> { return this.http.post<Entreprise>(this.url, e); }
  update(id: number, e: Entreprise): Observable<Entreprise> { return this.http.put<Entreprise>(`${this.url}/${id}`, e); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.url}/${id}`); }
}