import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditItemComponent } from './audit-item.component';

describe('AuditItemComponent', () => {
  let component: AuditItemComponent;
  let fixture: ComponentFixture<AuditItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
