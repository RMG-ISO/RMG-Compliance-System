import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskTreatmentModalComponent } from './risk-treatment-modal.component';

describe('RiskTreatmentModalComponent', () => {
  let component: RiskTreatmentModalComponent;
  let fixture: ComponentFixture<RiskTreatmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskTreatmentModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskTreatmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
