import { ComponentFixture, TestBed } from '@angular/core/testing';

import { riskopportunityComponent } from './riskopportunity.component';

describe('riskopportunityComponent', () => {
  let component: riskopportunityComponent;
  let fixture: ComponentFixture<riskopportunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ riskopportunityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(riskopportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
