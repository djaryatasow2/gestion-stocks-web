import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserDto {
  id?: number; 
  username: string;
  password?: string;
  email: string;
  nom?: string;
  prenom?: string;
  role: string;
  active?: boolean;
  entrepriseId?: number;
}

@Injectable({ providedIn: 'root' })
export class UtilisateurService {
  private apiUrl = '/api/users';

  constructor(private http: HttpClient) {}

  getAll(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.apiUrl);
  }

  create(user: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(this.apiUrl, user);
  }

  update(id: number, user: UserDto): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.apiUrl}/${id}`, user);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}