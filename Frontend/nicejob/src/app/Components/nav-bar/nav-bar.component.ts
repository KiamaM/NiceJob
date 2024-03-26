import { CommonModule, Location } from '@angular/common';
import { Component, ElementRef, ViewChild} from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BackNavigationComponent } from '../back-navigation/back-navigation.component';
import { RolePromptComponent } from '../role-prompt/role-prompt.component';
import { SetRoleService } from '../../Services/set-role.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLinkActive, RolePromptComponent, RouterOutlet, CommonModule, RouterLink, BackNavigationComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent{  

  @ViewChild('rolePrompt') rolePrompt!:ElementRef<HTMLDialogElement>

  isLoggedIn = this.getToken()


  constructor(private roleService:SetRoleService, private router:Router, private authservice:AuthService, private location:Location){}

  getToken(){
    if(typeof window !== 'undefined'){
      return localStorage?.getItem('token') as string
    }else{
      return null
    }
  }

  

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }



  ngAfterViewInit() {

    this.rolePrompt.nativeElement.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as Element;
      if (target.nodeName === 'DIALOG') {
        this.closerolePrompt();
      }
    });
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
    this.roleService.role = 'specialist'
    localStorage.setItem('role', this.roleService.role)
    this.closerolePrompt()
    // this.rolePrompt.nativeElement.style.display = 'none';
    this.router.navigate(['register'])
    
  }

  defineClient(){
    this.roleService.role = 'client'
    localStorage.setItem('role', this.roleService.role)
    this.closerolePrompt()
    // this.rolePrompt.nativeElement.style.display = 'none';
    this.router.navigate(['register'])
  }

  openDashboard(){
    this.location.back();
  }


}
