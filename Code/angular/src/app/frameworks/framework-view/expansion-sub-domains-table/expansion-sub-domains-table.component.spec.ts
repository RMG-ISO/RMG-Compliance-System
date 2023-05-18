import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionSubDomainsTableComponent } from './expansion-sub-domains-table.component';

describe('ExpansionSubDomainsTableComponent', () => {
  let component: ExpansionSubDomainsTableComponent;
  let fixture: ComponentFixture<ExpansionSubDomainsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpansionSubDomainsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionSubDomainsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
