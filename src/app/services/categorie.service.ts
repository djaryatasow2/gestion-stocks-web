import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Categorie {
  id: number;
  nom: string;
  description: string;
  nombreArticles: number;
}

@Injectable({ providedIn: 'root' })
export class CategorieService {
  private url = 'http://localhost:8080/api/categories';
  constructor(private http: HttpClient) {}
  getAll(): Observable<Categorie[]> { return this.http.get<Categorie[]>(this.url); }
  create(c: Categorie): Observable<Categorie> { return this.http.post<Categorie>(this.url, c); }
  update(id: number, c: Categorie): Observable<Categorie> { return this.http.put<Categorie>(`${this.url}/${id}`, c); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.url}/${id}`); }
}