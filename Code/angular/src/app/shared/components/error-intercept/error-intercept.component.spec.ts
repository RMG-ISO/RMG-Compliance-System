import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorInterceptComponent } from './error-intercept.component';

describe('ErrorInterceptComponent', () => {
  let component: ErrorInterceptComponent;
  let fixture: ComponentFixture<ErrorInterceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorInterceptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorInterceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
