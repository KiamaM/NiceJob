import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolePromptComponent } from './role-prompt.component';

describe('RolePromptComponent', () => {
  let component: RolePromptComponent;
  let fixture: ComponentFixture<RolePromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolePromptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RolePromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
