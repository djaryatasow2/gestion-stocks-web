import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NotificationDto {
  id?: number;
  type: string;
  message: string;
  estLue: boolean;
  dateEnvoi?: string;
  alerteId: number;
  userId: number;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private http = inject(HttpClient);
  private apiUrl = '/api/notifications';

  getByUser(userId: number): Observable<NotificationDto[]> {
    return this.http.get<NotificationDto[]>(`${this.apiUrl}/user/${userId}`);
  }

  getNonLues(userId: number): Observable<NotificationDto[]> {
    return this.http.get<NotificationDto[]>(`${this.apiUrl}/user/${userId}/non-lues`);
  }

  marquerLue(id: number): Observable<NotificationDto> {
    return this.http.put<NotificationDto>(`${this.apiUrl}/${id}/lire`, {});
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}