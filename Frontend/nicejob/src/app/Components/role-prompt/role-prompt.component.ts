import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { SetRoleService } from '../../Services/set-role.service';
import { ModalService } from '../../Services/modal.service';
import { RegisterFormComponent } from '../register-form/register-form.component';

@Component({
  selector: 'app-role-prompt',
  standalone: true,
  imports: [RegisterFormComponent],
  templateUrl: './role-prompt.component.html',
  styleUrl: './role-prompt.component.css'
})
export class RolePromptComponent {

  constructor(private roleService:SetRoleService, private modalService:ModalService){}

  defineSpecialist(){
    this.roleService.role = 'Specialist'
    console.log(this.roleService.role);
    
  }

  defineClient(){
    this.roleService.role = 'Client'
    console.log(this.roleService.role);
  }


}
