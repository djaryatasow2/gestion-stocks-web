import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CategorieDto {
  id?: number;
  nom: string;
  description: string;
  categorieParentId?: number | null;
}

@Injectable({ providedIn: 'root' })
export class CategorieService {
  constructor(private http: HttpClient) {}
  private apiUrl = '/api/categories';

  getAll(): Observable<CategorieDto[]> {
    return this.http.get<CategorieDto[]>(this.apiUrl);
  }

  getById(id: number): Observable<CategorieDto> {
    return this.http.get<CategorieDto>(`${this.apiUrl}/${id}`);
  }

  getSousCategories(parentId: number): Observable<CategorieDto[]> {
    return this.http.get<CategorieDto[]>(`${this.apiUrl}/${parentId}/sous-categories`);
  }

  create(c: CategorieDto): Observable<CategorieDto> {
    return this.http.post<CategorieDto>(this.apiUrl, c);
  }

  update(id: number, c: CategorieDto): Observable<CategorieDto> {
    return this.http.put<CategorieDto>(`${this.apiUrl}/${id}`, c);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}