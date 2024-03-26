import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpecialistsComponent } from './view-specialists.component';

describe('ViewSpecialistsComponent', () => {
  let component: ViewSpecialistsComponent;
  let fixture: ComponentFixture<ViewSpecialistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSpecialistsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewSpecialistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
