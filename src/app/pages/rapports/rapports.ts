import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TypeRapport {
  id: number;
  titre: string;
  description: string;
  derniereGeneration: string;
}

@Component({
  selector: 'app-rapports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rapports.html',
  styleUrl: './rapports.scss',
})
export class Rapports {
  typesRapports: TypeRapport[] = [
    { id: 1, titre: 'Rapport de stock global', description: 'État complet des stocks sur tous les entrepôts', derniereGeneration: '20/06/2026' },
    { id: 2, titre: 'Rapport des mouvements', description: 'Historique des entrées, sorties et transferts', derniereGeneration: '18/06/2026' },
    { id: 3, titre: "Rapport d'alertes", description: 'Liste des articles en stock bas ou en rupture', derniereGeneration: '21/06/2026' },
    { id: 4, titre: 'Rapport par entreprise', description: 'Synthèse des stocks par entreprise cliente', derniereGeneration: '15/06/2026' },
  ];

  exporterPDF(rapport: TypeRapport) {
    alert(`Export PDF de "${rapport.titre}" — fonctionnalité à connecter au backend.`);
  }

  exporterExcel(rapport: TypeRapport) {
    alert(`Export Excel de "${rapport.titre}" — fonctionnalité à connecter au backend.`);
  }
}