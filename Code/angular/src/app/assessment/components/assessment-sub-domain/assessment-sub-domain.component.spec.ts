import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentSubDomainComponent } from './assessment-sub-domain.component';

describe('AssessmentSubDomainComponent', () => {
  let component: AssessmentSubDomainComponent;
  let fixture: ComponentFixture<AssessmentSubDomainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentSubDomainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentSubDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
