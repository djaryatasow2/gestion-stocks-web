import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DashboardDto {
  totalArticles: number;
  totalEntrepots: number;
  totalStocksCritiques: number;
  totalAlertesNonTraitees: number;
  totalMouvementsAujourdhui: number;
  valeurTotaleStock: number;
}
@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient) {}
  
  private apiUrl = '/api/dashboard';
  
  getStats(): Observable<DashboardDto> {
    return this.http.get<DashboardDto>(this.apiUrl);
  }
}
