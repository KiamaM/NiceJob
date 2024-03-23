import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { SetRoleService } from '../../Services/set-role.service';

@Component({
  selector: 'app-role-prompt',
  standalone: true,
  imports: [],
  templateUrl: './role-prompt.component.html',
  styleUrl: './role-prompt.component.css'
})
export class RolePromptComponent {

  constructor(private roleService:SetRoleService){}

  defineSpecialist(){
    this.roleService.role = 'Specialist'
    console.log(this.roleService.role);
    
  }

  defineClient(){
    this.roleService.role = 'Client'
    console.log(this.roleService.role);
  }


}
