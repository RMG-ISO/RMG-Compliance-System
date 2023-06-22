import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameReportComponent } from './frame-report.component';

describe('FrameReportComponent', () => {
  let component: FrameReportComponent;
  let fixture: ComponentFixture<FrameReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
