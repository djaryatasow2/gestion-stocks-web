import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  constructor(
    private service: AlerteService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.service.getAll().subscribe({
      next: (data) => {
        this.alertes = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Impossible de charger les alertes.';
        this.cdr.detectChanges();
      }
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
      next: () => {
        a.estTraite = true;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Erreur lors du traitement.';
        this.cdr.detectChanges();
      }
    });
  }

  acquitter(a: AlerteDto): void {
    if (!a.id) return;
    this.service.acquitter(a.id).subscribe({
      next: () => {
        a.estTraite = true;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Erreur lors de l\'acquittement.';
        this.cdr.detectChanges();
      }
    });
  }

  delete(a: AlerteDto): void {
    if (!a.id) return;
    this.service.delete(a.id).subscribe({
      next: () => {
        this.charger();
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la suppression.';
        this.cdr.detectChanges();
      }
    });
  }
}