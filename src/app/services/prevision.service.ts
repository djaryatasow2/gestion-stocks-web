import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PrevisionService {
  private url = 'http://localhost:8080/api/previsions';
  constructor(private http: HttpClient) {}
  get(articleId: number, horizon: number): Observable<any> {
    return this.http.get(`${this.url}?articleId=${articleId}&horizon=${horizon}`);
  }
}