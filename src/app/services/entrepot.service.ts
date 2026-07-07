import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EntrepotDto {
  id?: number;
  nom: string;
  adresse: string;
  code: string;
  capaciteMax: number;
  actif: boolean;
  entrepriseId: number;
}

@Injectable({ providedIn: 'root' })
export class EntrepotService {
  private http = inject(HttpClient);
  private apiUrl = '/api/entrepots';

  getAll(): Observable<EntrepotDto[]> {
    return this.http.get<EntrepotDto[]>(this.apiUrl);
  }

  getById(id: number): Observable<EntrepotDto> {
    return this.http.get<EntrepotDto>(`${this.apiUrl}/${id}`);
  }

  getByEntreprise(entrepriseId: number): Observable<EntrepotDto[]> {
    return this.http.get<EntrepotDto[]>(`${this.apiUrl}/entreprise/${entrepriseId}`);
  }

  create(e: EntrepotDto): Observable<EntrepotDto> {
    return this.http.post<EntrepotDto>(this.apiUrl, e);
  }

  update(id: number, e: EntrepotDto): Observable<EntrepotDto> {
    return this.http.put<EntrepotDto>(`${this.apiUrl}/${id}`, e);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}