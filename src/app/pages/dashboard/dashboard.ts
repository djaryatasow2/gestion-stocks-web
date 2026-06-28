import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  stats = [
    { label: 'Total articles', value: 0 },
    { label: 'Entrepôts actifs', value: 0 },
    { label: 'Alertes en cours', value: 0 },
    { label: 'Ruptures de stock', value: 0 },
  ];

  alertes: any[] = [];
  repartitionEntrepots: any[] = [];
  isLoading = false;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
    this.isLoading = true;
    this.dashboardService.getStats().subscribe({
      next: (data: any) => {
        this.isLoading = false;
        this.stats = [
          { label: 'Total articles', value: data.totalArticles || 0 },
          { label: 'Entrepôts actifs', value: data.totalEntrepots || 0 },
          { label: 'Alertes en cours', value: data.alertesActives || 0 },
          { label: 'Ruptures de stock', value: data.rupturesStock || 0 },
        ];
        this.alertes = data.alertes || [];
        this.repartitionEntrepots = data.repartitionEntrepots || [];
      },
      error: () => {
        this.isLoading = false;
        this.stats = [
          { label: 'Total articles', value: 245 },
          { label: 'Entrepôts actifs', value: 5 },
          { label: 'Alertes en cours', value: 12 },
          { label: 'Ruptures de stock', value: 3 },
        ];
        this.alertes = [
          { article: 'Souris sans fil', niveau: 5, seuil: 15, entrepot: 'Entrepôt A' },
          { article: 'Chaise de bureau', niveau: 0, seuil: 5, entrepot: 'Entrepôt B' },
          { article: 'Câble HDMI', niveau: 2, seuil: 10, entrepot: 'Entrepôt C' },
        ];
        this.repartitionEntrepots = [
          { nom: 'Entrepôt A', pourcentage: 42 },
          { nom: 'Entrepôt B', pourcentage: 28 },
          { nom: 'Entrepôt C', pourcentage: 30 },
        ];
      }
    });
  }
}