import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { PrevisionService, PrevisionDto } from '../../services/prevision.service';

Chart.register(...registerables);

@Component({
  selector: 'app-previsions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './previsions.html',
  styleUrl: './previsions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Previsions implements OnInit, AfterViewInit {
  @ViewChild('courbeChart') courbeRef!: ElementRef;

  previsions: PrevisionDto[] = [];
  isLoading = false;
  errorMessage = '';
  showModal = false;
  isEditMode = false;
  current: PrevisionDto = this.empty();
  toDelete: PrevisionDto | null = null;
  showDeleteConfirm = false;
  chart: any = null;

  constructor(
    private service: PrevisionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void { this.charger(); }

  ngAfterViewInit(): void {
    setTimeout(() => this.creerChart(), 500);
  }

  charger(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.service.getAll().subscribe({
      next: (data: PrevisionDto[]) => {
        this.previsions = data;
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Impossible de charger les prévisions.';
        this.cdr.markForCheck();
      }
    });
  }

  empty(): PrevisionDto {
    return {
      periodeDebut: '',
      periodeFin: '',
      quantitePrevue: 0,
      methodePrevision: '',
      niveauConfiance: 0,
      articleId: 0,
      entrepotId: 0
    };
  }

  openAdd(): void { this.isEditMode = false; this.current = this.empty(); this.showModal = true; }
  openEdit(p: PrevisionDto): void { this.isEditMode = true; this.current = { ...p }; this.showModal = true; }
  closeModal(): void { this.showModal = false; }

  save(): void {
    if (this.isEditMode && this.current.id) {
      this.service.update(this.current.id, this.current).subscribe({
        next: () => { this.charger(); this.closeModal(); },
        error: () => { this.errorMessage = 'Erreur lors de la modification.'; }
      });
    } else {
      this.service.create(this.current).subscribe({
        next: () => { this.charger(); this.closeModal(); },
        error: () => { this.errorMessage = 'Erreur lors de la création.'; }
      });
    }
  }

  confirmDelete(p: PrevisionDto): void { this.toDelete = p; this.showDeleteConfirm = true; }
  cancelDelete(): void { this.toDelete = null; this.showDeleteConfirm = false; }

  delete(): void {
    if (this.toDelete?.id) {
      this.service.delete(this.toDelete.id).subscribe({
        next: () => { this.charger(); this.cancelDelete(); },
        error: () => { this.errorMessage = 'Erreur lors de la suppression.'; }
      });
    }
  }

  creerChart(): void {
    if (!this.courbeRef) return;
    if (this.chart) this.chart.destroy();
    this.chart = new Chart(this.courbeRef.nativeElement, {
      type: 'line',
      data: {
        labels: this.previsions.map(p => p.periodeDebut),
        datasets: [{
          label: 'Quantité prévue',
          data: this.previsions.map(p => p.quantitePrevue),
          borderColor: '#7a1f2b',
          backgroundColor: 'rgba(122, 31, 43, 0.08)',
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointBackgroundColor: '#7a1f2b',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
        scales: {
          y: { beginAtZero: true, grid: { color: '#f4f0e9' } },
          x: { grid: { display: false } }
        }
      }
    });
  }
}