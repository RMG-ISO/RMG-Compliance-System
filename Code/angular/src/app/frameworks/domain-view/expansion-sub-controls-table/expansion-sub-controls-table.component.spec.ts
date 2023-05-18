import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionSubControlsTableComponent } from './expansion-sub-controls-table.component';

describe('ExpansionSubControlsTableComponent', () => {
  let component: ExpansionSubControlsTableComponent;
  let fixture: ComponentFixture<ExpansionSubControlsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpansionSubControlsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionSubControlsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
