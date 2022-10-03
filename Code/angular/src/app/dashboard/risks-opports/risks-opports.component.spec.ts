import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RisksOpportsComponent } from './risks-opports.component';

describe('RisksOpportsComponent', () => {
  let component: RisksOpportsComponent;
  let fixture: ComponentFixture<RisksOpportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RisksOpportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RisksOpportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
