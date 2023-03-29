import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameworkViewComponent } from './framework-view.component';

describe('FrameworkViewComponent', () => {
  let component: FrameworkViewComponent;
  let fixture: ComponentFixture<FrameworkViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameworkViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameworkViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
