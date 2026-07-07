import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MouvementsService, MouvementStockDto } from '../../services/mouvements.service';
import { RapportService } from '../../services/rapport.service';

@Component({
  selector: 'app-historique',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historique.html',
  styleUrl: './historique.scss',
})
export class Historique implements OnInit {
  mouvements: MouvementStockDto[] = [];
  filterType = 'tous';
  searchTerm = '';
  isLoading = false;
  errorMessage = '';

  constructor(
    private mouvementService: MouvementsService,
    private rapportService: RapportService
  ) {}

  ngOnInit(): void { this.charger(); }

  charger(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.mouvementService.getAll().subscribe({
      next: (data: MouvementStockDto[]) => {
        this.mouvements = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Impossible de charger l\'historique.';
      }
    });
  }

  get filtered(): MouvementStockDto[] {
    let result = this.mouvements;
    if (this.filterType !== 'tous') {
      result = result.filter(m => m.typeMouvement === this.filterType.toUpperCase());
    }
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(m =>
        (m.reference || '').toLowerCase().includes(term) ||
        (m.motif || '').toLowerCase().includes(term)
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
    this.rapportService.exportMouvements().subscribe({
      next: (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'historique.csv';
        a.click();
        URL.revokeObjectURL(url);
      },
      error: () => { this.errorMessage = 'Erreur lors de l\'export.'; }
    });
  }
}