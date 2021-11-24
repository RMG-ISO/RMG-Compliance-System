import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentSubControlComponent } from './assessment-sub-control.component';

describe('AssessmentSubControlComponent', () => {
  let component: AssessmentSubControlComponent;
  let fixture: ComponentFixture<AssessmentSubControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentSubControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentSubControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
