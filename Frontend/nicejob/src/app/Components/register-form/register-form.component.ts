import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavBarComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  msgVisible!:string
  msgVisible2!:string
  errorMsg!:string
  successMsg!:string
  title!:string

  registerForm!:FormGroup

  constructor(private fb:FormBuilder){
    this.registerForm = this.fb.group({

    })
  }



  registerClient(){

  }

}
