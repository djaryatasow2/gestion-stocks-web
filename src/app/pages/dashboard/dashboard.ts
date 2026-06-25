import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  stats = [
    { label: 'Total articles', value: 245, suffix: '' },
    { label: 'Entrepôts actifs', value: 5, suffix: '' },
    { label: 'Alertes en cours', value: 12, suffix: '' },
    { label: 'Ruptures de stock', value: 3, suffix: '' },
  ];

  alertes = [
    { article: 'Souris sans fil', niveau: 5, seuil: 15, entrepot: 'Entrepôt A' },
    { article: 'Chaise de bureau', niveau: 0, seuil: 5, entrepot: 'Entrepôt B' },
    { article: 'Câble HDMI', niveau: 2, seuil: 10, entrepot: 'Entrepôt C' },
  ];

  repartitionEntrepots = [
    { nom: 'Entrepôt A', pourcentage: 42 },
    { nom: 'Entrepôt B', pourcentage: 28 },
    { nom: 'Entrepôt C', pourcentage: 30 },
  ];
}