import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplienceSettingBreadcrumbComponent } from './complience-setting-breadcrumb.component';

describe('ComplienceSettingBreadcrumbComponent', () => {
  let component: ComplienceSettingBreadcrumbComponent;
  let fixture: ComponentFixture<ComplienceSettingBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplienceSettingBreadcrumbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplienceSettingBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
