import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ArticleDto {
  id?: number;
  code: string;
  nom: string;
  description: string;
  uniteMesure: string;
  poids: number;
  volume: number;
  codeBarre: string;
  qrCode: string;
  categorieId: number;
  entrepriseId: number;
}

@Injectable({ providedIn: 'root' })
export class ArticleService {
  constructor(private http: HttpClient) {}
  private apiUrl = '/api/articles';

  getAll(): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(this.apiUrl);
  }

  getById(id: number): Observable<ArticleDto> {
    return this.http.get<ArticleDto>(`${this.apiUrl}/${id}`);
  }

  getByEntreprise(entrepriseId: number): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(`${this.apiUrl}/entreprise/${entrepriseId}`);
  }

  getByCode(code: string): Observable<ArticleDto> {
    return this.http.get<ArticleDto>(`${this.apiUrl}/code/${code}`);
  }

  getByCodeBarre(codeBarre: string): Observable<ArticleDto> {
    return this.http.get<ArticleDto>(`${this.apiUrl}/codebarre/${codeBarre}`);
  }

  create(a: ArticleDto): Observable<ArticleDto> {
    return this.http.post<ArticleDto>(this.apiUrl, a);
  }

  update(id: number, a: ArticleDto): Observable<ArticleDto> {
    return this.http.put<ArticleDto>(`${this.apiUrl}/${id}`, a);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}