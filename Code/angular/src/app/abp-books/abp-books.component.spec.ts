import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbpBooksComponent } from './abp-books.component';

describe('AbpBooksComponent', () => {
  let component: AbpBooksComponent;
  let fixture: ComponentFixture<AbpBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbpBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbpBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
