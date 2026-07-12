import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StockDto {
  id?: number;
  quantite: number;
  quantiteMinimale: number;
  quantiteMaximale: number;
  emplacement: string;
  lastUpdated?: string;
  articleId: number;
  entrepotId: number;
}

@Injectable({ providedIn: 'root' })
export class StockService {
  constructor(private http: HttpClient) {}
  private apiUrl = '/api/stocks';

  getAll(): Observable<StockDto[]> {
    return this.http.get<StockDto[]>(this.apiUrl);
  }

  getById(id: number): Observable<StockDto> {
    return this.http.get<StockDto>(`${this.apiUrl}/${id}`);
  }

  getSousSeuil(): Observable<StockDto[]> {
    return this.http.get<StockDto[]>(`${this.apiUrl}/sous-seuil`);
  }

  getByEntrepot(entrepotId: number): Observable<StockDto[]> {
    return this.http.get<StockDto[]>(`${this.apiUrl}/entrepot/${entrepotId}`);
  }

  create(s: StockDto): Observable<StockDto> {
    return this.http.post<StockDto>(this.apiUrl, s);
  }

  update(id: number, s: StockDto): Observable<StockDto> {
    return this.http.put<StockDto>(`${this.apiUrl}/${id}`, s);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}