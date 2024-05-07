import { Component } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { profile } from '../../Interfaces/profile.interface';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listings-table',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './listings-table.component.html',
  styleUrl: './listings-table.component.css'
})
export class ListingsTableComponent {

  errorMsg!:string
  successMsg!:string

  emptyDisplay!:boolean

  visible = false
  visible2 = false


  id!:string

  userId!:string

  profiles:profile[] = []


  constructor(private api:ApiService){
    this.getProfilesBySpecialist(this.userId)
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

  

}
