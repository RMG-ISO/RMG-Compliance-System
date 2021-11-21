import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignGuideComponent } from './design-guide.component';

describe('DesignGuideComponent', () => {
  let component: DesignGuideComponent;
  let fixture: ComponentFixture<DesignGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
