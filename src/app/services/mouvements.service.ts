import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MouvementStockDto {
  id?: number;
  typeMouvement?: string;
  quantite?: number;
  reference?: string;
  dateMouvement?: string;
  motif?: string;
  coutUnitaire?: number;
  prixVente?: number;
  stockId?: number;
  userId?: number;
}

@Injectable({ providedIn: 'root' })
export class MouvementsService {
  private http = inject(HttpClient);
  private apiUrl = '/api/mouvements';

  getAll(): Observable<MouvementStockDto[]> {
    return this.http.get<MouvementStockDto[]>(this.apiUrl);
  }

  create(mouvement: MouvementStockDto): Observable<MouvementStockDto> {
    return this.http.post<MouvementStockDto>(this.apiUrl, mouvement);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
