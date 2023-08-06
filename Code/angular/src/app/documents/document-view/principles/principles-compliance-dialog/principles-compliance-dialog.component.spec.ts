import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinciplesComplianceDialogComponent } from './principles-compliance-dialog.component';

describe('PrinciplesComplianceDialogComponent', () => {
  let component: PrinciplesComplianceDialogComponent;
  let fixture: ComponentFixture<PrinciplesComplianceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrinciplesComplianceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrinciplesComplianceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
