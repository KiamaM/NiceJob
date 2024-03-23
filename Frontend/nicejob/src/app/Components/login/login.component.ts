import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { loginUserDetails } from '../../Interfaces/auth.interface';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterOutlet, RouterLinkActive, NavBarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMsg!:string
  successMsg!:string

  visible = false
  visible2 = false

  constructor(private router:Router, private authservice:AuthService ){}

  login(details:loginUserDetails){
    console.log(details);

    this.authservice.loginUser(details).subscribe(res=>{
      console.log(res);
      
      if(res.error){
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
        }, 3000);

        localStorage.setItem('token', res.token)

        // console.log(res.token);
        
        let newToken = localStorage.getItem('token') as string
        console.log(newToken);
        

        this.authservice.readToken(newToken).subscribe(res=>{
          console.log(res);

          setTimeout(() => {
            this.visible2 = false
            console.log(res.info.email);
            
            
            if(res.info.role == 'admin'){

              this.router.navigate(['admin-dashboard'])
            }else if(res.info.role == 'specialist'){
              this.router.navigate(['specialist-dashboard'])
            }else{
              this.router.navigate(['client-dashboard'])
            }
          }, 2000);
        })

        
      }
    })


  }
}
