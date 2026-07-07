import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserDto {
  id?: number;
  username: string;
  password?: string;
  email: string;
  nom: string;
  prenom: string;
  role: string;
  active: boolean;
  entrepriseId: number;
}

@Injectable({ providedIn: 'root' })
export class UtilisateurService {
  private http = inject(HttpClient);
  private apiUrl = '/api/users';

  getAll(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.apiUrl);
  }

  getById(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl}/${id}`);
  }

  getByEntreprise(entrepriseId: number): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.apiUrl}/entreprise/${entrepriseId}`);
  }

  create(u: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(this.apiUrl, u);
  }

  update(id: number, u: UserDto): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.apiUrl}/${id}`, u);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}