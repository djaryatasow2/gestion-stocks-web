import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RapportService } from '../../services/rapport.service';

@Component({
  selector: 'app-rapports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rapports.html',
  styleUrl: './rapports.scss',
})
export class Rapports {
  isLoading = false;
  errorMessage = '';
  messageSucces = '';

  constructor(private service: RapportService) {}

  exporterStocks(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.service.exportStocks().subscribe({
      next: (blob) => {
        this.isLoading = false;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'rapport-stocks.csv';
        a.click();
        URL.revokeObjectURL(url);
        this.messageSucces = 'Export stocks téléchargé !';
        setTimeout(() => this.messageSucces = '', 3000);
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Erreur lors de l\'export des stocks.';
      }
    });
  }

  exporterMouvements(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.service.exportMouvements().subscribe({
      next: (blob) => {
        this.isLoading = false;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'rapport-mouvements.csv';
        a.click();
        URL.revokeObjectURL(url);
        this.messageSucces = 'Export mouvements téléchargé !';
        setTimeout(() => this.messageSucces = '', 3000);
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Erreur lors de l\'export des mouvements.';
      }
    });
  }
}