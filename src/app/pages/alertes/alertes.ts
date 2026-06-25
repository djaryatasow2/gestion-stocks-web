import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Alerte {
  id: number;
  article: string;
  entrepot: string;
  niveauActuel: number;
  seuilMinimum: number;
  traitee: boolean;
}

@Component({
  selector: 'app-alertes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alertes.html',
  styleUrl: './alertes.scss',
})
export class Alertes {
  alertes: Alerte[] = [
    { id: 1, article: 'Souris sans fil', entrepot: 'Entrepôt A', niveauActuel: 5, seuilMinimum: 15, traitee: false },
    { id: 2, article: 'Chaise de bureau', entrepot: 'Entrepôt B', niveauActuel: 0, seuilMinimum: 5, traitee: false },
    { id: 3, article: 'Câble HDMI', entrepot: 'Entrepôt C', niveauActuel: 2, seuilMinimum: 10, traitee: false },
    { id: 4, article: 'Toner imprimante', entrepot: 'Entrepôt A', niveauActuel: 1, seuilMinimum: 8, traitee: true },
  ];

  get alertesActives(): Alerte[] { return this.alertes.filter(a => !a.traitee); }
  get alertesTraitees(): Alerte[] { return this.alertes.filter(a => a.traitee); }
  marquerTraitee(a: Alerte) { a.traitee = true; }
  isRupture(a: Alerte): boolean { return a.niveauActuel === 0; }
}