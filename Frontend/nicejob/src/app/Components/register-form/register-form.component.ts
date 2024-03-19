import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { SetRoleService } from '../../Services/set-role.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';



@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterLinkActive, LoginComponent, NavBarComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  


  msgVisible!:string
  msgVisible2!:string
  errorMsg!:string
  successMsg!:string
  title:string = 'Sign Up'


  registerForm!:FormGroup
  
  

  constructor(private fb: FormBuilder,public roleService:SetRoleService,private router:Router) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      role:[''],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:\'"|,.<>\\/\\\\]{8,30}$'), Validators.minLength(8)]],
    });
  }
  

  registerUser(){
    this.registerForm.get('role')?.setValue(this.roleService.role)


    console.log(this.registerForm.value);

    const registerDetails = this.registerForm.value

    // this.registerService.registerUser(registerDetails).subscribe(
    //   response=>{
    //     console.log(response);
    //     this.registerForm.reset()
    //     this.router.navigate(['login'])
        
    //   },
    //   error=>{
    //     console.error(error);
        
    //   }
    // )
    this.registerForm.reset()
    this.router.navigate(['login'])
    
  }
  openLoginModal(){
    this.router.navigate(['login'])
  }


  receiveRole(){
    console.log(this.roleService.role);
    
  }



}
