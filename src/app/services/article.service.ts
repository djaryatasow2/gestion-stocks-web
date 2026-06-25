import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Article {
  id: number;
  nom: string;
  reference: string;
  categorie: string;
  quantite: number;
  seuilMinimum: number;
  entrepot: string;
}

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private url = 'http://localhost:8080/api/articles';
  constructor(private http: HttpClient) {}
  getAll(): Observable<Article[]> { return this.http.get<Article[]>(this.url); }
  create(a: Article): Observable<Article> { return this.http.post<Article>(this.url, a); }
  update(id: number, a: Article): Observable<Article> { return this.http.put<Article>(`${this.url}/${id}`, a); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.url}/${id}`); }
}