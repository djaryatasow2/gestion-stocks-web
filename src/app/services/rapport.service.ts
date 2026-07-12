import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RapportService {
  constructor(private http: HttpClient) {}
  private apiUrl = '/api/rapports';

  exportStocks(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export`, { responseType: 'blob' });
  }

  exportMouvements(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/mouvements/export`, { responseType: 'blob' });
  }
}