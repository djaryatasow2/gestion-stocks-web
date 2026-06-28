import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RapportService } from '../../services/rapport.service';

interface TypeRapport {
  id: number;
  titre: string;
  description: string;
  derniereGeneration: string;
  type: string;
}

@Component({
  selector: 'app-rapports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rapports.html',
  styleUrl: './rapports.scss',
})
export class Rapports {
  isLoading = false;
  messageSucces = '';

  typesRapports: TypeRapport[] = [
    { id: 1, titre: 'Rapport de stock global', description: 'État complet des stocks sur tous les entrepôts', derniereGeneration: '20/06/2026', type: 'stock' },
    { id: 2, titre: 'Rapport des mouvements', description: 'Historique des entrées, sorties et transferts', derniereGeneration: '18/06/2026', type: 'mouvements' },
    { id: 3, titre: "Rapport d'alertes", description: 'Liste des articles en stock bas ou en rupture', derniereGeneration: '21/06/2026', type: 'alertes' },
    { id: 4, titre: 'Rapport par entreprise', description: 'Synthèse des stocks par entreprise cliente', derniereGeneration: '15/06/2026', type: 'entreprises' },
  ];

  constructor(private rapportService: RapportService) {}

  exporterPDF(rapport: TypeRapport): void {
    this.isLoading = true;
    this.rapportService.exporter('pdf').subscribe({
      next: (blob) => {
        this.isLoading = false;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${rapport.type}-rapport.pdf`;
        a.click();
        URL.revokeObjectURL(url);
        this.messageSucces = 'Export PDF téléchargé !';
        setTimeout(() => this.messageSucces = '', 3000);
      },
      error: () => {
        this.isLoading = false;
        this.messageSucces = 'Export PDF non disponible pour le moment.';
        setTimeout(() => this.messageSucces = '', 3000);
      }
    });
  }

  exporterExcel(rapport: TypeRapport): void {
    this.isLoading = true;
    this.rapportService.exporter('excel').subscribe({
      next: (blob) => {
        this.isLoading = false;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${rapport.type}-rapport.xlsx`;
        a.click();
        URL.revokeObjectURL(url);
        this.messageSucces = 'Export Excel téléchargé !';
        setTimeout(() => this.messageSucces = '', 3000);
      },
      error: () => {
        this.isLoading = false;
        this.messageSucces = 'Export Excel non disponible pour le moment.';
        setTimeout(() => this.messageSucces = '', 3000);
      }
    });
  }
}