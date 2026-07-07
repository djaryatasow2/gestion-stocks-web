import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeuilsAlerte } from './seuils-alerte';
import { SeuilAlerteService } from '../../services/seuil-alerte.service';
import { of, throwError } from 'rxjs';

describe('SeuilsAlerte', () => {
  let component: SeuilsAlerte;
  let fixture: ComponentFixture<SeuilsAlerte>;
  let service: SeuilAlerteService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeuilsAlerte],
      providers: [SeuilAlerteService]
    }).compileComponents();

    fixture = TestBed.createComponent(SeuilsAlerte);
    component = fixture.componentInstance;
    service = TestBed.inject(SeuilAlerteService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load seuils on init', () => {
    spyOn(service, 'getAll').and.returnValue(of([{ id: '1', seuilMinimum: 10 }]));
    component.ngOnInit();
    expect(component.seuils.length).toBe(1);
  });

  it('should validate form data before saving', () => {
    component.formData = { articleId: '', seuilMinimum: 0, seuilMaximum: 0, alerteActif: true };
    component.saveSeuil();
    expect(component.error).toBeTruthy();
  });
});
