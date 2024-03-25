import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingsTableComponent } from './listings-table.component';

describe('ListingsTableComponent', () => {
  let component: ListingsTableComponent;
  let fixture: ComponentFixture<ListingsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListingsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
