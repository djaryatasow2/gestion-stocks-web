import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EntrepriseDto {
  id?: number;
  nom: string;
  adresse: string;
  telephone: string;
  email: string;
  siret: string;
  dateCreation?: string;
}

@Injectable({ providedIn: 'root' })
export class EntrepriseService {
  private http = inject(HttpClient);
  private apiUrl = '/api/entreprises';

  getAll(): Observable<EntrepriseDto[]> {
    return this.http.get<EntrepriseDto[]>(this.apiUrl);
  }

  getById(id: number): Observable<EntrepriseDto> {
    return this.http.get<EntrepriseDto>(`${this.apiUrl}/${id}`);
  }

  create(e: EntrepriseDto): Observable<EntrepriseDto> {
    return this.http.post<EntrepriseDto>(this.apiUrl, e);
  }

  update(id: number, e: EntrepriseDto): Observable<EntrepriseDto> {
    return this.http.put<EntrepriseDto>(`${this.apiUrl}/${id}`, e);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}