import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID,} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { SetRoleService } from '../../Services/set-role.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { RegisterService } from '../../Services/register.service';

import Swal from 'sweetalert2'

// const Swal = require('sweetalert2')



@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterLinkActive, LoginComponent, NavBarComponent, RouterOutlet],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent{

  

  msgVisible:Boolean =  false
  msgVisible2:Boolean = false
  errorMsg!:string
  successMsg!:string
  title:string = 'Sign Up'
  
  role!:string 

  registerForm!:FormGroup
  
  

  constructor( @Inject(PLATFORM_ID) private platformId: object,private fb: FormBuilder,public roleService:SetRoleService,private router:Router, private registerService:RegisterService) {

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
    if (isPlatformBrowser(this.platformId)) {
      // Code specific to the browser platform

      this.role = localStorage.getItem('role') as string
          console.log(this.role);
    
    
    this.registerForm.get('role')?.setValue(this.role)


    console.log(this.registerForm.value);

    const registerDetails = this.registerForm.value

    this.registerService.registerUser(registerDetails).subscribe(
      response=>{
        if(response.message){
        console.log(response);
        setTimeout(() => {
          this.registerForm.reset()
          this.router.navigate(['login'])
          console.log('wow');
          
          
        }, 3000);
	
        let timerInterval:any;
        Swal.fire({
        title: 'Account created Successfully!',
        text: 'Login...!',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        buttonsStyling: false,
        customClass: {
            confirmButton: 'btn btn-primary px-4'
            },
            didOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {
                const content = Swal.getHtmlContainer();
                if (content) {
                const b: any = content.querySelector('b');
                if (b) {
                    b.textContent = Swal.getTimerLeft();
                }
                }
            }, 100);
            },
            willClose: () => {
            clearInterval(timerInterval);
            },
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
            }
        });

      }else{
        this.msgVisible = true
        this.errorMsg = response.error
        setTimeout(() => {
          this.msgVisible = false
        }, 5000);
      }



        
      },
      error=>{
        console.error(error);
        
      }
    )

    }

    

    // this.registerForm.reset()
    // this.router.navigate(['login'])
    
  }
  openLoginModal(){
    this.router.navigate(['login'])
  }


  receiveRole(){
    console.log(this.roleService.role);
        
    
  }



}
