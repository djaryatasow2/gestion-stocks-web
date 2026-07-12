import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AlerteDto {
  id?: number;
  typeAlerte: string;
  message: string;
  estTraite: boolean;
  dateCreation?: string;
  dateTraitement?: string;
  stockId: number;
}

@Injectable({ providedIn: 'root' })
export class AlerteService {
  constructor(private http: HttpClient) {}
  private apiUrl = '/api/alertes';

  getAll(): Observable<AlerteDto[]> {
    return this.http.get<AlerteDto[]>(this.apiUrl);
  }

  getById(id: number): Observable<AlerteDto> {
    return this.http.get<AlerteDto>(`${this.apiUrl}/${id}`);
  }

  getNonTraitees(): Observable<AlerteDto[]> {
    return this.http.get<AlerteDto[]>(`${this.apiUrl}/non-traitees`);
  }

  traiter(id: number): Observable<AlerteDto> {
    return this.http.put<AlerteDto>(`${this.apiUrl}/${id}/traiter`, {});
  }

  acquitter(id: number): Observable<AlerteDto> {
    return this.http.patch<AlerteDto>(`${this.apiUrl}/${id}/acquitter`, {});
  }

  create(a: AlerteDto): Observable<AlerteDto> {
    return this.http.post<AlerteDto>(this.apiUrl, a);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}