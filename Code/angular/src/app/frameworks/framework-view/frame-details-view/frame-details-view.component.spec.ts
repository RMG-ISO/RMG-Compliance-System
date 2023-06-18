import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameDetailsViewComponent } from './frame-details-view.component';

describe('FrameDetailsViewComponent', () => {
  let component: FrameDetailsViewComponent;
  let fixture: ComponentFixture<FrameDetailsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameDetailsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
