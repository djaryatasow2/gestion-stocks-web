import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  constructor(public authService: AuthService) {}

  get menuItems() {
    const role = this.authService.getRole();
    const tous = [
      { label: 'Tableau de bord', route: '/dashboard' },
      { label: 'Articles', route: '/articles', roles: ['Administrateur', 'Gestionnaire Stock'] },
      { label: 'Catégories', route: '/categories', roles: ['Administrateur', 'Gestionnaire Stock'] },
      { label: 'Entrepôts', route: '/entrepots', roles: ['Administrateur', 'Gestionnaire Stock', 'Responsable Entrepôt'] },
      { label: 'Entreprises', route: '/entreprises', roles: ['Administrateur'] },
      { label: 'Utilisateurs', route: '/utilisateurs', roles: ['Administrateur'] },
      { label: 'Historique', route: '/historique', roles: ['Administrateur', 'Gestionnaire Stock', 'Responsable Entrepôt'] },
      { label: 'Alertes', route: '/alertes', roles: ['Administrateur', 'Gestionnaire Stock', 'Responsable Entrepôt'] },
      { label: 'Prévisions', route: '/previsions', roles: ['Administrateur', 'Gestionnaire Stock'] },
      { label: 'Rapports', route: '/rapports', roles: ['Administrateur'] },
    ];
    return tous.filter(item => !item.roles || item.roles.includes(role));
  }
}