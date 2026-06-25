import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RapportService {
  private url = 'http://localhost:8080/api/rapports';
  constructor(private http: HttpClient) {}
  exporter(format: 'pdf' | 'excel'): Observable<Blob> {
    return this.http.get(`${this.url}/export?format=${format}`, { responseType: 'blob' });
  }
}