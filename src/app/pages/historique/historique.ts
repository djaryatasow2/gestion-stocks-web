import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Mouvement {
  id: number;
  date: string;
  article: string;
  type: string;
  quantite: number;
  entrepot?: string;
  entrepotSource?: string;
  entrepotDestination?: string;
  utilisateur: string;
}

@Component({
  selector: 'app-historique',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historique.html',
  styleUrl: './historique.scss',
})
export class Historique implements OnInit {
  mouvements: Mouvement[] = [];
  filterType = 'tous';
  searchTerm = '';
  isLoading = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
    this.isLoading = true;
    this.http.get<Mouvement[]>('/api/mouvements').subscribe({
      next: (data: Mouvement[]) => { this.mouvements = data; this.isLoading = false; },
      error: () => {
        this.isLoading = false;
        this.mouvements = [
          { id: 1, date: '2026-06-20', article: 'Ordinateur portable HP', type: 'ENTREE', quantite: 15, entrepot: 'Entrepôt A', entrepotSource: '', entrepotDestination: '', utilisateur: 'Djaryata' },
          { id: 2, date: '2026-06-19', article: 'Souris sans fil', type: 'SORTIE', quantite: 8, entrepot: 'Entrepôt A', entrepotSource: 'Entrepôt A', entrepotDestination: '', utilisateur: 'Ahmed' },
          { id: 3, date: '2026-06-18', article: 'Chaise de bureau', type: 'TRANSFERT', quantite: 5, entrepot: 'Entrepôt B', entrepotSource: 'Entrepôt A', entrepotDestination: 'Entrepôt B', utilisateur: 'Fatima' },
        ];
      }
    });
  }

  get filteredMouvements(): Mouvement[] {
    let result = this.mouvements;
    if (this.filterType !== 'tous') {
      result = result.filter(m => m.type === this.filterType.toUpperCase());
    }
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(m =>
        m.article.toLowerCase().includes(term) ||
        (m.entrepot || '').toLowerCase().includes(term) ||
        m.utilisateur.toLowerCase().includes(term)
      );
    }
    return result;
  }

  getTypeLabel(type: string): string {
    if (type === 'ENTREE') return 'Entrée';
    if (type === 'SORTIE') return 'Sortie';
    return 'Transfert';
  }

  exportCSV(): void {
    const headers = ['Date', 'Article', 'Type', 'Quantité', 'Entrepôt', 'Utilisateur'];
    const rows = this.filteredMouvements.map(m =>
      [m.date, m.article, this.getTypeLabel(m.type), m.quantite, m.entrepot || '', m.utilisateur].join(',')
    );
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'historique.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
}