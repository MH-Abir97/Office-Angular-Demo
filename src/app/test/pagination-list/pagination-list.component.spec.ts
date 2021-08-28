import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationListComponent } from './pagination-list.component';

describe('PaginationListComponent', () => {
  let component: PaginationListComponent;
  let fixture: ComponentFixture<PaginationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
