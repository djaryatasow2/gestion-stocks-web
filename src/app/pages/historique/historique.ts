import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Mouvement {
  id: number;
  date: string;
  article: string;
  type: 'entree' | 'sortie' | 'transfert';
  quantite: number;
  entrepot: string;
  utilisateur: string;
}

@Component({
  selector: 'app-historique',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historique.html',
  styleUrl: './historique.scss',
})
export class Historique {
  mouvements: Mouvement[] = [
    { id: 1, date: '2026-06-20', article: 'Ordinateur portable HP', type: 'entree', quantite: 15, entrepot: 'Entrepôt A', utilisateur: 'Djaryata' },
    { id: 2, date: '2026-06-19', article: 'Souris sans fil', type: 'sortie', quantite: 8, entrepot: 'Entrepôt A', utilisateur: 'Ahmed' },
    { id: 3, date: '2026-06-18', article: 'Chaise de bureau', type: 'transfert', quantite: 5, entrepot: 'Entrepôt B', utilisateur: 'Fatima' },
    { id: 4, date: '2026-06-17', article: 'Imprimante Laser', type: 'entree', quantite: 6, entrepot: 'Entrepôt B', utilisateur: 'Djaryata' },
    { id: 5, date: '2026-06-16', article: 'Câble HDMI', type: 'sortie', quantite: 12, entrepot: 'Entrepôt C', utilisateur: 'Ahmed' },
  ];

  filterType: string = 'tous';
  searchTerm: string = '';

  get filteredMouvements(): Mouvement[] {
    let result = this.mouvements;

    if (this.filterType !== 'tous') {
      result = result.filter(m => m.type === this.filterType);
    }

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(m =>
        m.article.toLowerCase().includes(term) ||
        m.entrepot.toLowerCase().includes(term) ||
        m.utilisateur.toLowerCase().includes(term)
      );
    }

    return result;
  }

  getTypeLabel(type: string): string {
    if (type === 'entree') return 'Entrée';
    if (type === 'sortie') return 'Sortie';
    return 'Transfert';
  }
}