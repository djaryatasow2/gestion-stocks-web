import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  token: string;
  role: string;
  nom: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = '/api';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('nom', res.nom);
        localStorage.setItem('email', res.email);
      })
    );
  }

  loginSimulation(email: string, password: string): void {
    localStorage.setItem('token', 'fake-token-temp');
    localStorage.setItem('email', email);
    localStorage.setItem('nom', email.split('@')[0]);

    if (email.includes('admin')) {
      localStorage.setItem('role', 'ADMIN');
    } else if (email.includes('responsable')) {
      localStorage.setItem('role', 'RESPONSABLE');
    } else {
      localStorage.setItem('role', 'GESTIONNAIRE');
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }

  getNom(): string {
    return localStorage.getItem('nom') || '';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  isGestionnaire(): boolean {
    return this.getRole() === 'GESTIONNAIRE';
  }

  isResponsable(): boolean {
    return this.getRole() === 'RESPONSABLE';
  }

  hasRole(roles: string[]): boolean {
    return roles.includes(this.getRole());
  }
}