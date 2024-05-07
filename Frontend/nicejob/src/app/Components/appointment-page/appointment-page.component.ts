import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SchedulerComponent } from '../scheduler/scheduler.component';
import { BackNavigationComponent } from '../back-navigation/back-navigation.component';
import { users } from '../../Interfaces/users.interface';
import { ApiService } from '../../Services/api.service';
import { AuthService } from '../../Services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-appointment-page',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, RouterLink, RouterLinkActive, RouterOutlet, SchedulerComponent, BackNavigationComponent],
  templateUrl: './appointment-page.component.html',
  styleUrl: './appointment-page.component.css'
})
export class AppointmentPageComponent {
  errorMsg!:string
  successMsg!:string

  emptyDisplay!:boolean

  visible = false
  visible2 = false

  deleteBtnTxt = 'Deactivate'


  id!:string

  userId!:string

  specialists:users[] = []

  constructor(@Inject(PLATFORM_ID) private platformId: object, private api:ApiService, private authservice:AuthService){}




  bookAppointment(listingId:string){
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('token') as string
      this.authservice.readToken(user).subscribe(res=>{
        console.log(res.info.userId);
        this.userId = res.info.userId

        console.log(this.userId);
        
        const details = {
          userId: this.userId,
          listingId: listingId
        }
        
        this.api.scheduleAppointment(details).subscribe(res=>{
          console.log(res);    
        })
        
      })

    }
  }

}
