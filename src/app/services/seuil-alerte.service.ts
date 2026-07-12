import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SeuilAlerteDto {
  id?: number;
  seuilMinimum: number;
  seuilMaximum: number;
  articleId: number;
  entrepotId: number;
}

@Injectable({ providedIn: 'root' })
export class SeuilAlerteService {
  private apiUrl = '/api/seuils';

  constructor(private http: HttpClient) {}

  getAll(): Observable<SeuilAlerteDto[]> {
    return this.http.get<SeuilAlerteDto[]>(this.apiUrl);
  }

  create(seuil: SeuilAlerteDto): Observable<SeuilAlerteDto> {
    return this.http.post<SeuilAlerteDto>(this.apiUrl, seuil);
  }

  update(id: number, seuil: SeuilAlerteDto): Observable<SeuilAlerteDto> {
    return this.http.put<SeuilAlerteDto>(`${this.apiUrl}/${id}`, seuil);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}