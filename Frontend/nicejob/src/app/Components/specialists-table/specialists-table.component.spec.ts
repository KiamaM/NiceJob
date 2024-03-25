import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistsTableComponent } from './specialists-table.component';

describe('SpecialistsTableComponent', () => {
  let component: SpecialistsTableComponent;
  let fixture: ComponentFixture<SpecialistsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialistsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecialistsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
