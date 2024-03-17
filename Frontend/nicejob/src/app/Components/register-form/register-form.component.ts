import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { ModalService } from '../../Services/modal.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterLinkActive, LoginComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;


  msgVisible!:string
  msgVisible2!:string
  errorMsg!:string
  successMsg!:string
  title!:string

  registerForm!:FormGroup
  
  

  constructor(private fb:FormBuilder, private modalService:ModalService){
    this.registerForm = this.fb.group({
      firstName:[],
      lastName:[],
      email:[],
      phoneNumber:[],
      password:[],
    })
  }

  openLoginModal(){
    this.modalService.openModal.call
  }





  registerClient(){

  }

}
