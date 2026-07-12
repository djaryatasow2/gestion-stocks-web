import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PrevisionDto {
  id?: number;
  periodeDebut: string;
  periodeFin: string;
  quantitePrevue: number;
  methodePrevision: string;
  niveauConfiance: number;
  articleId: number;
  entrepotId: number;
}

@Injectable({ providedIn: 'root' })
export class PrevisionService {
  constructor(private http: HttpClient) {}
  private apiUrl = '/api/previsions';

  getAll(): Observable<PrevisionDto[]> {
    return this.http.get<PrevisionDto[]>(this.apiUrl);
  }

  getById(id: number): Observable<PrevisionDto> {
    return this.http.get<PrevisionDto>(`${this.apiUrl}/${id}`);
  }

  getByArticle(articleId: number): Observable<PrevisionDto[]> {
    return this.http.get<PrevisionDto[]>(`${this.apiUrl}/article/${articleId}`);
  }

  getByEntrepot(entrepotId: number): Observable<PrevisionDto[]> {
    return this.http.get<PrevisionDto[]>(`${this.apiUrl}/entrepot/${entrepotId}`);
  }

  create(p: PrevisionDto): Observable<PrevisionDto> {
    return this.http.post<PrevisionDto>(this.apiUrl, p);
  }

  update(id: number, p: PrevisionDto): Observable<PrevisionDto> {
    return this.http.put<PrevisionDto>(`${this.apiUrl}/${id}`, p);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}