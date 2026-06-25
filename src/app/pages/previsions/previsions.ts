import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Prevision {
  article: string;
  entrepot: string;
  stockActuel: number;
  consommationMoyenne: number;
  joursAvantRupture: number;
}

@Component({
  selector: 'app-previsions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './previsions.html',
  styleUrl: './previsions.scss',
})
export class Previsions {
  previsions: Prevision[] = [
    { article: 'Souris sans fil', entrepot: 'Entrepôt A', stockActuel: 5, consommationMoyenne: 2.5, joursAvantRupture: 2 },
    { article: 'Toner imprimante', entrepot: 'Entrepôt A', stockActuel: 8, consommationMoyenne: 1.2, joursAvantRupture: 7 },
    { article: 'Câble HDMI', entrepot: 'Entrepôt C', stockActuel: 12, consommationMoyenne: 1.5, joursAvantRupture: 8 },
    { article: 'Chaise de bureau', entrepot: 'Entrepôt B', stockActuel: 20, consommationMoyenne: 0.8, joursAvantRupture: 25 },
  ];

  tendanceMensuelle = [
    { mois: 'Jan', valeur: 65 },
    { mois: 'Fév', valeur: 72 },
    { mois: 'Mar', valeur: 58 },
    { mois: 'Avr', valeur: 80 },
    { mois: 'Mai', valeur: 74 },
    { mois: 'Juin', valeur: 90 },
  ];

  getUrgenceClass(jours: number): string {
    if (jours <= 3) return 'critique';
    if (jours <= 10) return 'attention';
    return 'normal';
  }

  getMaxValeur(): number {
    return Math.max(...this.tendanceMensuelle.map(t => t.valeur));
  }
}