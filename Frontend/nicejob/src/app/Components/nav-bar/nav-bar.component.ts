import { CommonModule, Location } from '@angular/common';
import { Component, ElementRef, ViewChild} from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BackNavigationComponent } from '../back-navigation/back-navigation.component';
import { RolePromptComponent } from '../role-prompt/role-prompt.component';
import { SetRoleService } from '../../Services/set-role.service';
import { AuthService } from '../../Services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../Services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLinkActive, RolePromptComponent, RouterOutlet, CommonModule, RouterLink, BackNavigationComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent{  

  @ViewChild('rolePrompt') rolePrompt!:ElementRef<HTMLDialogElement>

  isLoggedIn = this.getToken()

  filter = ''

  filteredProfiles: any[] = [];
  filterForm!: FormGroup
  query!:string


  constructor(private http:HttpClient,private roleService:SetRoleService, private router:Router, private authservice:AuthService, private location:Location, private api:ApiService, private fb:FormBuilder){
    this.filterForm = this.fb.group({
      search: ['']
    })
  }

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


  

  getFilteredProducts(){
    if(this.filterForm.valid){
      this.query = this.filterForm.value.search
      console.log(this.filterForm.value.search)

    }
    // this.filter.get('search')
    // console.log(this.filterForm.get('search')?.value);
    
    // console.log(query);

    this.api.getSpecialistProfiles().subscribe(res=>{
      // console.log(res);
      
      this.filteredProfiles = res.profiles.filter(
        productsList => productsList?.serviceName.toLowerCase().includes(this.query.toLowerCase())

      );

      console.log(this.filteredProfiles);
      

    })
    
  }


}
