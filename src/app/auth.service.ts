import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private role: string = '';

  setRole(role: string) {
    this.role = role;
    localStorage.setItem('role', role);
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }

  isAdmin(): boolean {
    return this.getRole() === 'Administrateur';
  }

  isGestionnaire(): boolean {
    return this.getRole() === 'Gestionnaire Stock';
  }

  isResponsable(): boolean {
    return this.getRole() === 'Responsable Entrepôt';
  }

  logout() {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
  }
}