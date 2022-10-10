import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameworkReportComponent } from './framework-report.component';

describe('FrameworkReportComponent', () => {
  let component: FrameworkReportComponent;
  let fixture: ComponentFixture<FrameworkReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameworkReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameworkReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
