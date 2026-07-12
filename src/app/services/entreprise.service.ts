import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EntrepriseDto {
  id?: number;
  nom: string;
  adresse?: string;
  telephone?: string;
  email?: string;
  siret?: string;
  dateCreation?: string;
}

@Injectable({ providedIn: 'root' })
export class EntrepriseService {
  private apiUrl = '/api/entreprises';

  constructor(private http: HttpClient) {}

  getAll(): Observable<EntrepriseDto[]> {
    return this.http.get<EntrepriseDto[]>(this.apiUrl);
  }

  getById(id: number): Observable<EntrepriseDto> {
    return this.http.get<EntrepriseDto>(`${this.apiUrl}/${id}`);
  }

  create(entreprise: EntrepriseDto): Observable<EntrepriseDto> {
    return this.http.post<EntrepriseDto>(this.apiUrl, entreprise);
  }

  update(id: number, entreprise: EntrepriseDto): Observable<EntrepriseDto> {
    return this.http.put<EntrepriseDto>(`${this.apiUrl}/${id}`, entreprise);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}