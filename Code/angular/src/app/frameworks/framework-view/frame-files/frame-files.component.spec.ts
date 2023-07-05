import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameFilesComponent } from './frame-files.component';

describe('FrameFilesComponent', () => {
  let component: FrameFilesComponent;
  let fixture: ComponentFixture<FrameFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
