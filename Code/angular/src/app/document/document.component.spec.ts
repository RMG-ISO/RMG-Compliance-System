import { ComponentFixture, TestBed } from '@angular/core/testing';

import { documentComponent } from './document.component';

describe('documentComponent', () => {
  let component: documentComponent;
  let fixture: ComponentFixture<documentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ documentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(documentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
