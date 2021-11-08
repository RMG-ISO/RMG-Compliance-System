import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceDepartmentComponent } from './compliance-department.component';

describe('ComplianceDepartmentComponent', () => {
  let component: ComplianceDepartmentComponent;
  let fixture: ComponentFixture<ComplianceDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplianceDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
