import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Entrepots } from './entrepots';

describe('Entrepots', () => {
  let component: Entrepots;
  let fixture: ComponentFixture<Entrepots>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Entrepots],
    }).compileComponents();

    fixture = TestBed.createComponent(Entrepots);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
