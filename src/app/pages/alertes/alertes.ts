import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlerteService, AlerteDto } from '../../services/alerte.service';

@Component({
  selector: 'app-alertes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alertes.html',
  styleUrl: './alertes.scss',
})
export class Alertes implements OnInit {
  alertes: AlerteDto[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private service: AlerteService) {}

  ngOnInit(): void { this.charger(); }

  charger(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.service.getAll().subscribe({
      next: (data) => { this.alertes = data; this.isLoading = false; },
      error: () => { this.isLoading = false; this.errorMessage = 'Impossible de charger les alertes.'; }
    });
  }

  get alertesActives(): AlerteDto[] {
    return this.alertes.filter(a => !a.estTraite);
  }

  get alertesTraitees(): AlerteDto[] {
    return this.alertes.filter(a => a.estTraite);
  }

  traiter(a: AlerteDto): void {
    if (!a.id) return;
    this.service.traiter(a.id).subscribe({
      next: () => { a.estTraite = true; },
      error: () => { this.errorMessage = 'Erreur lors du traitement.'; }
    });
  }

  acquitter(a: AlerteDto): void {
    if (!a.id) return;
    this.service.acquitter(a.id).subscribe({
      next: () => { a.estTraite = true; },
      error: () => { this.errorMessage = 'Erreur lors de l\'acquittement.'; }
    });
  }

  delete(a: AlerteDto): void {
    if (!a.id) return;
    this.service.delete(a.id).subscribe({
      next: () => this.charger(),
      error: () => { this.errorMessage = 'Erreur lors de la suppression.'; }
    });
  }
}