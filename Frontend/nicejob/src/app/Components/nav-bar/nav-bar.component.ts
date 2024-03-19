import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild} from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BackNavigationComponent } from '../back-navigation/back-navigation.component';
import { RolePromptComponent } from '../role-prompt/role-prompt.component';
import { SetRoleService } from '../../Services/set-role.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLinkActive, RolePromptComponent, RouterOutlet, RouterLinkActive, CommonModule, RouterLink, BackNavigationComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent{  
  // @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;
  // @ViewChild('regDialog') regDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('rolePrompt') rolePrompt!:ElementRef<HTMLDialogElement>

  constructor(private roleService:SetRoleService, private router:Router){}



  // closeLoginModal() {
  //   this.dialog.nativeElement.close();
  //   this.dialog.nativeElement.classList.remove('opened');
  // }

  openLoginModal() {
    // this.dialog.nativeElement.showModal();
    // this.dialog.nativeElement.classList.add('opened');
  }

  ngAfterViewInit() {
    // this.dialog.nativeElement.addEventListener('click', (event: MouseEvent) => {
    //   const target = event.target as Element;
    //   if (target.nodeName === 'DIALOG') {
    //     this.closeLoginModal();
    //   }
    // });

    // this.regDialog.nativeElement.addEventListener('click', (event: MouseEvent) => {
    //   const target = event.target as Element;
    //   if (target.nodeName === 'DIALOG') {
    //     this.closeRegisterModal();
    //   }
    // });

    this.rolePrompt.nativeElement.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as Element;
      if (target.nodeName === 'DIALOG') {
        this.closerolePrompt();
      }
    });
  }

  closeRegisterModal() {
    // this.regDialog.nativeElement.close();
    // this.regDialog.nativeElement.classList.remove('opened');
  }

  openRegisterModal() {
    // this.regDialog.nativeElement.showModal();
    // this.regDialog.nativeElement.classList.add('opened');
    // this.router.navigate(['register'])
  }

  closerolePrompt() {
    this.rolePrompt.nativeElement.close();
    this.rolePrompt.nativeElement.classList.remove('opened');
  }

  openrolePrompt() {

    this.rolePrompt.nativeElement.showModal();
    this.rolePrompt.nativeElement.classList.add('opened');
  }

  defineSpecialist(){
    this.openrolePrompt()
    this.roleService.role = 'Specialist'
    console.log(this.roleService.role);
    this.rolePrompt.nativeElement.style.display = 'none';
    this.router.navigate(['register'])
    
  }

  defineClient(){
    this.roleService.role = 'Client'
    console.log(this.roleService.role);
    this.rolePrompt.nativeElement.style.display = 'none';
    this.router.navigate(['register'])
  }


}
