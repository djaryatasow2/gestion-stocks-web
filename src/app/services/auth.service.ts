import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

export interface AuthRequestDto {
  username: string;
  password: string;
}

export interface AuthResponseDto {
  accessToken: string;
  refreshToken: string;
  username: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  login(credentials: AuthRequestDto) {
    return this.http.post<AuthResponseDto>('/api/auth/login', credentials).pipe(
      tap((res: AuthResponseDto) => {
        localStorage.setItem('token', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        localStorage.setItem('username', res.username);
        localStorage.setItem('role', res.role);
      })
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getToken(): string | null { return localStorage.getItem('token'); }
  getRole(): string { return localStorage.getItem('role') || ''; }
  getUsername(): string { return localStorage.getItem('username') || ''; }
  getNom(): string { return localStorage.getItem('username') || ''; }
  isLoggedIn(): boolean { return !!this.getToken(); }
  isAdmin(): boolean { return this.getRole() === 'ADMIN'; }
  isGestionnaire(): boolean { return this.getRole() === 'GESTIONNAIRE_STOCK'; }
  isResponsable(): boolean { return this.getRole() === 'RESPONSABLE_ENTREPOT'; }
  hasRole(roles: string[]): boolean { return roles.includes(this.getRole()); }
}