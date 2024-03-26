import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { Router } from '@angular/router';
import { resetPassword } from '../../Interfaces/users.interface';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, NavBarComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  errorMsg!:string
  successMsg!:string

visible = false
visible2 = false

constructor(private router:Router, private api:AuthService){}

resetPassword(details:resetPassword){
  this.api.resetPassword(details).subscribe(res=>{
    console.log(details);
    

    if(res.error){
      console.log(res.error);
      
      this.visible = true
      this.errorMsg = res.error

      setTimeout(() => {
        this.visible = false
      }, 3000);
    }else if(res.message){
      this.visible2 = true
      this.successMsg = res.message

      setTimeout(() => {
        this.visible2 = false
        this.router.navigate(['login'])
      }, 3000);
    }


  })
}

}
