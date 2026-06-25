import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Alerte {
  id: number;
  article: string;
  entrepot: string;
  niveauActuel: number;
  seuilMinimum: number;
  traitee: boolean;
}

@Injectable({ providedIn: 'root' })
export class AlerteService {
  private url = 'http://localhost:8080/api/alertes';
  constructor(private http: HttpClient) {}
  getAll(): Observable<Alerte[]> { return this.http.get<Alerte[]>(this.url); }
  acquitter(id: number): Observable<void> { return this.http.patch<void>(`${this.url}/${id}/acquitter`, {}); }
}