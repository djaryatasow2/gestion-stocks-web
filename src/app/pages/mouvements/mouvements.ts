import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Mouvement {
  id: number;
  type: string;
  article: string;
  entrepot?: string;
  entrepotSource?: string;
  entrepotDestination?: string;
  quantite: number;
  date: string;
  utilisateur: string;
}

@Component({
  selector: 'app-mouvements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mouvements.html',
  styleUrl: './mouvements.css',
})
export class Mouvements implements OnInit {
  mouvements: Mouvement[] = [];
  articles = ['Ordinateur HP', 'Souris sans fil', 'Chaise de bureau', 'Imprimante Laser'];
  entrepots = ['Entrepôt A', 'Entrepôt B', 'Entrepôt C'];
  showModal = false;
  isLoading = false;
  currentMouvement = this.empty();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
    this.isLoading = true;
    this.http.get<Mouvement[]>('/api/mouvements').subscribe({
      next: (data) => { this.mouvements = data; this.isLoading = false; },
      error: () => {
        this.isLoading = false;
        this.mouvements = [
          { id: 1, type: 'ENTREE', article: 'Ordinateur HP', entrepot: 'Entrepôt A', entrepotSource: '', entrepotDestination: 'Entrepôt A', quantite: 10, date: '2026-06-25', utilisateur: 'Djaryata' },
          { id: 2, type: 'SORTIE', article: 'Souris sans fil', entrepot: 'Entrepôt A', entrepotSource: 'Entrepôt A', entrepotDestination: '', quantite: 3, date: '2026-06-24', utilisateur: 'Ahmed' },
          { id: 3, type: 'TRANSFERT', article: 'Chaise de bureau', entrepot: 'Entrepôt A', entrepotSource: 'Entrepôt A', entrepotDestination: 'Entrepôt B', quantite: 5, date: '2026-06-23', utilisateur: 'Fatima' },
        ];
      }
    });
  }

  empty() {
    return {
      id: 0,
      type: 'ENTREE' as string,
      article: '',
      entrepot: '',
      entrepotSource: '',
      entrepotDestination: '',
      quantite: 0,
      date: new Date().toISOString().split('T')[0],
      utilisateur: localStorage.getItem('nom') || ''
    };
  }

  openModal() { this.currentMouvement = this.empty(); this.showModal = true; }
  closeModal() { this.showModal = false; }

  getTypeLabel(type: string): string {
    if (type === 'ENTREE') return 'Entrée';
    if (type === 'SORTIE') return 'Sortie';
    return 'Transfert';
  }

  saveMouvement() {
    if (!this.currentMouvement.article || !this.currentMouvement.quantite) return;
    this.http.post<Mouvement>('/api/mouvements', this.currentMouvement).subscribe({
      next: () => { this.charger(); this.closeModal(); },
      error: () => {
        const newId = Math.max(0, ...this.mouvements.map(m => m.id)) + 1;
        this.mouvements.unshift({ ...this.currentMouvement, id: newId });
        this.closeModal();
      }
    });
  }
}