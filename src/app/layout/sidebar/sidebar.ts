import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
})
export class Sidebar {
  constructor(public authService: AuthService) {}

  get menuItems() {
    const role = this.authService.getRole();
    const tous = [
      { label: 'Tableau de bord', route: '/dashboard', roles: [] },
      { label: 'Mouvements', route: '/mouvements', roles: ['ADMIN', 'GESTIONNAIRE'] },
      { label: 'Articles', route: '/articles', roles: ['ADMIN', 'GESTIONNAIRE'] },
      { label: 'Catégories', route: '/categories', roles: ['ADMIN', 'GESTIONNAIRE'] },
      { label: 'Entrepôts', route: '/entrepots', roles: ['ADMIN', 'GESTIONNAIRE', 'RESPONSABLE'] },
      { label: 'Entreprises', route: '/entreprises', roles: ['ADMIN'] },
      { label: 'Utilisateurs', route: '/utilisateurs', roles: ['ADMIN'] },
      { label: 'Historique', route: '/historique', roles: [] },
      { label: 'Alertes', route: '/alertes', roles: [] },
      { label: 'Prévisions', route: '/previsions', roles: ['ADMIN', 'GESTIONNAIRE'] },
      { label: 'Rapports', route: '/rapports', roles: ['ADMIN', 'GESTIONNAIRE'] },
    ];
    return tous.filter(item => item.roles.length === 0 || item.roles.includes(role));
  }
}
