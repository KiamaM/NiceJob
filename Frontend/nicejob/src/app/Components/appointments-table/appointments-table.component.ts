import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { userAppointments } from '../../Interfaces/appointment.interface';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../Services/auth.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-appointments-table',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './appointments-table.component.html',
  styleUrl: './appointments-table.component.css'
})
export class AppointmentsTableComponent {

  errorMsg!:string
  successMsg!:string

  emptyDisplay!:boolean

  visible = false
  visible2 = false

  userId!:string

  appointments:userAppointments[] = []

  constructor(@Inject(PLATFORM_ID) private platformId: object, private api:ApiService, private authservice:AuthService){
    this.getAppointments()
  }


  getAppointments(){    
    console.log('hi');
    
    if (isPlatformBrowser(this.platformId)) {
    const user = localStorage.getItem('token') as string
    this.authservice.readToken(user).subscribe(res=>{
      console.log(res.info.userId);
      this.userId = res.info.userId

      console.log(this.userId);     

      
      this.api.getAppointments(this.userId).subscribe(res=>{
        if(res.message){
          console.log(res);      
        
          console.log(res.appointments[0].phoneNumber);
  
          
    
          this.appointments = res.appointments
          console.log(this.appointments);
          this.visible2 = true
          this.successMsg = res.error
          setTimeout(() => {
            this.visible2 = false
          }, 5000);
        }else{
          this.visible = true
          this.errorMsg = res.error
          setTimeout(() => {
            this.visible = false
          }, 5000);
        }

      })
      
    })
  


  }



}

    //Add means to get user id and pass to function




  }


