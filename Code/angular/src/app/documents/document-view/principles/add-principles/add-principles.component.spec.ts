import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrinciplesComponent } from './add-principles.component';

describe('AddPrinciplesComponent', () => {
  let component: AddPrinciplesComponent;
  let fixture: ComponentFixture<AddPrinciplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPrinciplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPrinciplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
