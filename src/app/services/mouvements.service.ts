import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Mouvement {
  id: number;
  date: string;
  article: string;
  type: string;
  quantite: number;
  entrepot?: string;
  entrepotSource?: string;
  entrepotDestination?: string;
  utilisateur: string;
}

@Injectable({ providedIn: 'root' })
export class MouvementService {
  private url = '/api/mouvements';
  constructor(private http: HttpClient) {}
  getAll(): Observable<Mouvement[]> { return this.http.get<Mouvement[]>(this.url); }
  create(m: any): Observable<Mouvement> { return this.http.post<Mouvement>(this.url, m); }
}