import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Entrepot {
  id: number;
  nom: string;
  localisation: string;
  capacite: number;
  occupation: number;
}

@Injectable({ providedIn: 'root' })
export class EntrepotService {
  private url = 'http://localhost:8080/api/entrepots';
  constructor(private http: HttpClient) {}
  getAll(): Observable<Entrepot[]> { return this.http.get<Entrepot[]>(this.url); }
  create(e: Entrepot): Observable<Entrepot> { return this.http.post<Entrepot>(this.url, e); }
  update(id: number, e: Entrepot): Observable<Entrepot> { return this.http.put<Entrepot>(`${this.url}/${id}`, e); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.url}/${id}`); }
}