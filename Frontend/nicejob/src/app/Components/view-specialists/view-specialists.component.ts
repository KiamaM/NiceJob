import { Component } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { users } from '../../Interfaces/users.interface';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-specialists',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, CommonModule],
  templateUrl: './view-specialists.component.html',
  styleUrl: './view-specialists.component.css'
})
export class ViewSpecialistsComponent {
  errorMsg!:string
  successMsg!:string

  emptyDisplay!:boolean

  visible = false
  visible2 = false


  id!:string

  userId!:string

  specialists:users[] = []


  constructor(private api:ApiService){
    this.getSpecialists()
  }

  getSpecialists(){
    this.api.getSpecialists().subscribe(res=>{
      console.log(res);      
      console.log(this.specialists);
      
      console.log(res.specialists[0].phoneNumber);
      

      this.specialists = res.specialists
      console.log(this.specialists);

    })
  }

  deleteSpecialist(userId:string){
    this.api.deleteSpecialist(userId).subscribe(res=>{
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

      this.getSpecialists()
      }
    })

  }

  


}
