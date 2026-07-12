import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Seuils } from './seuils';
import { SeuilAlerteService, SeuilAlerteDto } from '../../services/seuil-alerte.service';
import { ArticleService } from '../../services/article.service';
import { EntrepotService } from '../../services/entrepot.service';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';

describe('Seuils', () => {
  let component: Seuils;
  let fixture: ComponentFixture<Seuils>;
  let service: SeuilAlerteService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Seuils, HttpClientTestingModule],
      providers: [SeuilAlerteService, ArticleService, EntrepotService, AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(Seuils);
    component = fixture.componentInstance;
    service = TestBed.inject(SeuilAlerteService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load seuils on init', () => {
    const mockData: SeuilAlerteDto[] = [
      { id: 1, seuilMinimum: 10, seuilMaximum: 50, articleId: 1, entrepotId: 1 }
    ];
    spyOn(service, 'getAll').and.returnValue(of(mockData));
    component.charger();
    expect(component.seuils.length).toBe(1);
  });

  it('should show error when article or entrepot is missing', () => {
    component.current = { articleId: 0, entrepotId: 0, seuilMinimum: 0, seuilMaximum: 0 };
    component.save();
    expect(component.errorMessage).toBeTruthy();
  });

  it('should show error when seuilMinimum >= seuilMaximum', () => {
    component.current = { articleId: 1, entrepotId: 1, seuilMinimum: 50, seuilMaximum: 10 };
    component.save();
    expect(component.errorMessage).toBe('Le seuil minimum doit être inférieur au seuil maximum.');
  });

  it('should handle error when loading seuils fails', () => {
    spyOn(service, 'getAll').and.returnValue(throwError(() => new Error('fail')));
    component.charger();
    expect(component.errorMessage).toBeTruthy();
    expect(component.isLoading).toBeFalse();
  });
});