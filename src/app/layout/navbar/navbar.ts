import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  showNotifications = false;
  pageTitle = 'Tableau de bord';

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
      this.pageTitle = this.getPageTitle(e.urlAfterRedirects);
    });
    this.pageTitle = this.getPageTitle(this.router.url);
  }

  getPageTitle(url: string): string {
    if (url.includes('/dashboard')) return 'Tableau de bord';
    if (url.includes('/articles')) return 'Articles';
    if (url.includes('/categories')) return 'Catégories';
    if (url.includes('/entrepots')) return 'Entrepôts';
    if (url.includes('/entreprises')) return 'Entreprises';
    if (url.includes('/utilisateurs')) return 'Utilisateurs';
    if (url.includes('/historique')) return 'Historique';
    if (url.includes('/alertes')) return 'Alertes';
    if (url.includes('/previsions')) return 'Prévisions';
    if (url.includes('/rapports')) return 'Rapports';
    if (url.includes('/profile')) return 'Mon profil';
    if (url.includes('/mouvements')) return 'Mouvements';
    if (url.includes('/stocks')) return 'Stocks';
    if (url.includes('/inventaires')) return 'Inventaires';
    if (url.includes('/notifications')) return 'Notifications';
    return 'SMART MS';
  }

  get initiales(): string {
    const nom = this.authService.getNom();
    if (!nom) return 'US';
    return nom.slice(0, 2).toUpperCase();
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  logout(): void {
    this.authService.logout();
  }
}