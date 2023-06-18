import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDomainsViewComponent } from './main-domains-view.component';

describe('MainDomainsViewComponent', () => {
  let component: MainDomainsViewComponent;
  let fixture: ComponentFixture<MainDomainsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainDomainsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDomainsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
