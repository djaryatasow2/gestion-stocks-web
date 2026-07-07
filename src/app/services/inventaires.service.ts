import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Inventaire {
  id?: number;
  nom: string;
  dateDebut: string;
  dateFin: string;
  statut: string;
  entrepriseId: number;
}

export interface LigneInventaire {
  id?: number;
  quantitePhysique: number;
  quantiteSysteme: number;
  ecart: number;
  remarques: string;
  scanDate?: string;
  inventaireId: number;
  articleId: number;
}

export interface InventaireSession {
  entrepriseId: number;
  entrepotId: number;
  lignes: LigneInventaire[];
}

@Injectable({ providedIn: 'root' })
export class InventaireService {
  private http = inject(HttpClient);
  private apiUrl = '/api/inventaires';

  getAll(): Observable<Inventaire[]> {
    return this.http.get<Inventaire[]>(this.apiUrl);
  }

  getById(id: number): Observable<Inventaire> {
    return this.http.get<Inventaire>(`${this.apiUrl}/${id}`);
  }

  getByEntreprise(entrepriseId: number): Observable<Inventaire[]> {
    return this.http.get<Inventaire[]>(`${this.apiUrl}/entreprise/${entrepriseId}`);
  }

  create(inventaire: Inventaire): Observable<Inventaire> {
    return this.http.post<Inventaire>(this.apiUrl, inventaire);
  }

  soumettreSession(session: InventaireSession): Observable<any> {
    return this.http.post(`${this.apiUrl}/session`, session);
  }

  update(id: number, inventaire: Inventaire): Observable<Inventaire> {
    return this.http.put<Inventaire>(`${this.apiUrl}/${id}`, inventaire);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}