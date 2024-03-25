import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { profile } from '../../Interfaces/profile.interface';
import { ApiService } from '../../Services/api.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-specialists-table',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './specialists-table.component.html',
  styleUrl: './specialists-table.component.css'
})
export class SpecialistsTableComponent {
  errorMsg!:string
  successMsg!:string

  emptyDisplay!:boolean

  visible = false
  visible2 = false


  id!:string

  userId!:string

  profiles:profile[] = []


  constructor(@Inject(PLATFORM_ID) private platformId: object, private api:ApiService, private authservice:AuthService){
    this.getSpecialistProfiles()
  }

  

  getSpecialistProfiles(){
    this.api.getSpecialistProfiles().subscribe(res=>{
      console.log(res);      
      console.log(this.profiles);
      
      console.log(res.profiles[0].phoneNumber);
      

      this.profiles = res.profiles
      console.log(this.profiles);

    })
  }

  getProfilesBySpecialist(userId:string){

    this.api.getProfilesBySpecialist(userId).subscribe(res=>{
      console.log(res);      
      console.log(this.profiles);
      
      console.log(res.profiles[0].phoneNumber);
      

      this.profiles = res.profiles
      console.log(this.profiles);
    })


  }


  deleteSpecialistProfile(userId:string){
    this.api.deleteSpecialistProfile(userId).subscribe(res=>{
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

      this.getProfilesBySpecialist(userId)
      }
    })

  }


  bookAppointment(listingId:string){
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('token') as string
      this.authservice.readToken(user).subscribe(res=>{
        console.log(res.info.userId);
        this.userId = res.info.userId

        console.log(this.userId);
        
        
        this.api.scheduleAppointment(this.userId, listingId).subscribe(res=>{
          console.log(res);    
        })
        
      })
    


    }



  }

}
