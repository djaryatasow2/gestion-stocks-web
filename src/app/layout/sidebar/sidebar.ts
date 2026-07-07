import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface MenuItem {
  label: string;
  route: string;
  roles: string[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
})
export class Sidebar implements OnInit {
  menuItems: MenuItem[] = [];

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    const role = this.authService.getRole();
    const tous: MenuItem[] = [
      { label: 'Tableau de bord', route: '/dashboard', roles: [] },
      { label: 'Alertes', route: '/alertes', roles: [] },
      { label: 'Historique', route: '/historique', roles: [] },
      { label: 'Entrepôts', route: '/entrepots', roles: [] },
      { label: 'Notifications', route: '/notifications', roles: [] },
      { label: 'Stocks', route: '/stocks', roles: ['ADMIN', 'GESTIONNAIRE_STOCK'] },
      { label: 'Articles', route: '/articles', roles: ['ADMIN', 'GESTIONNAIRE_STOCK'] },
      { label: 'Catégories', route: '/categories', roles: ['ADMIN', 'GESTIONNAIRE_STOCK'] },
      { label: 'Mouvements', route: '/mouvements', roles: ['ADMIN', 'GESTIONNAIRE_STOCK'] },
      { label: 'Prévisions', route: '/previsions', roles: ['ADMIN', 'GESTIONNAIRE_STOCK'] },
      { label: 'Rapports', route: '/rapports', roles: ['ADMIN', 'GESTIONNAIRE_STOCK'] },
      { label: 'Inventaires', route: '/inventaires', roles: ['ADMIN', 'GESTIONNAIRE_STOCK', 'MOBILE'] },
      { label: 'Entreprises', route: '/entreprises', roles: ['ADMIN'] },
      { label: 'Utilisateurs', route: '/utilisateurs', roles: ['ADMIN'] },
    ];
    this.menuItems = tous.filter(item => item.roles.length === 0 || item.roles.includes(role));
  }
}