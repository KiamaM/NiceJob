import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';


@Component({
  selector: 'app-dashboard-single-profile',
  standalone: true,
  imports: [DatePipe,FormsModule, CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './dashboard-single-profile.component.html',
  styleUrl: './dashboard-single-profile.component.css'
})
export class DashboardSingleProfileComponent {
  rating = 0

  errorMsg!:string
  successMsg!:string

  emptyDisplay!:boolean

  visible = false
  visible2 = false


  serviceId!:string
  profileId!:string


  userId!:string
  review!:string

profile:any

  constructor(@Inject(PLATFORM_ID) private platformId: object, private api:ApiService, private route:ActivatedRoute, private authservice:AuthService){
    this.getServiceId()
  }

  setRating(rating:number){
    this.rating = rating

  }


  scrollToReview(){
    // Scroll the window smoothly to coordinates (0, 500)
    window.scrollTo({
      top: 900,
      behavior: 'smooth'
    });

  }
  getServiceId(){
    this.route.params.subscribe(res=>{
      console.log(res['serviceId']);
      this.serviceId = res['serviceId']
      console.log(this.serviceId);
      

      this.viewProfile(this.serviceId)
    })
  }

    viewProfile(serviceId:string){
      this.api.getOneSpecialistProfile(serviceId).subscribe(res=>{
        console.log(res);      
        console.log(this.profile);
        
        console.log(res.profile);
        

        this.profile = res.profile[0]
        console.log(this.profile.serviceImage);

      })

  }

  addReview(reviewValue:string){
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('token') as string
      this.authservice.readToken(user).subscribe(res=>{
        console.log(res.info.userId);
        this.userId = res.info.userId

        console.log(this.userId);
    
    // const review ={
    //   userId:this.userId,
    //   profileId:this.serviceId,
    //   review:reviewValue,
    //   rating:this.rating
    // }
    // console.log(review);
    this.profileId = this.serviceId
    // this.review = reviewValue
    // log

    

    this.api.addReviews(this.userId,this.profileId, this.review, this.rating).subscribe(res=>{
      console.log(res);     

    })
  })

  
    
  }




}
}
