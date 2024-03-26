import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSingleProfileComponent } from './dashboard-single-profile.component';

describe('DashboardSingleProfileComponent', () => {
  let component: DashboardSingleProfileComponent;
  let fixture: ComponentFixture<DashboardSingleProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSingleProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardSingleProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
