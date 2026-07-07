import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, DashboardDto } from '../../services/dashboard.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard implements OnInit, AfterViewInit {
  @ViewChild('barChart') barRef!: ElementRef;

  stats: DashboardDto = {
    totalArticles: 0,
    totalEntrepots: 0,
    totalStocksCritiques: 0,
    totalAlertesNonTraitees: 0,
    totalMouvementsAujourdhui: 0,
    valeurTotaleStock: 0
  };

  isLoading = false;
  errorMessage = '';
  chart: any = null;

  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.charger();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.creerChart(), 500);
  }

  charger(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.dashboardService.getStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Impossible de charger le tableau de bord.';
        this.cdr.markForCheck();
      }
    });
  }

  creerChart(): void {
    if (!this.barRef) return;
    if (this.chart) this.chart.destroy();
    this.chart = new Chart(this.barRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Articles', 'Entrepôts', 'Stocks critiques', 'Alertes', 'Mouvements'],
        datasets: [{
          label: 'Statistiques',
          data: [
            this.stats.totalArticles,
            this.stats.totalEntrepots,
            this.stats.totalStocksCritiques,
            this.stats.totalAlertesNonTraitees,
            this.stats.totalMouvementsAujourdhui
          ],
          backgroundColor: '#7a1f2b',
          borderRadius: 4,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: '#f4f0e9' } },
          x: { grid: { display: false } }
        }
      }
    });
  }
}