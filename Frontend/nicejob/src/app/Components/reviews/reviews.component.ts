import { Component } from '@angular/core';
import { profileReviews, reviews } from '../../Interfaces/reviews.interface';
import { ApiService } from '../../Services/api.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
  errorMsg!:string
  successMsg!:string

  emptyDisplay!:boolean

  visible = false
  visible2 = false


  id!:string

  profileId!:string

  reviews:reviews[] = []
  profileReviews:profileReviews[] =[]


  constructor(private api:ApiService){
    this.getSpecialistProfileReviews(this.profileId)
  }

  getReviews(){
    this.api.getReviews().subscribe(res=>{

      console.log(res);      
      console.log(this.reviews);
      
      console.log(res.reviews[0]);
      

      this.reviews = res.reviews
      console.log(this.reviews);

    })
  }

  getSpecialistProfileReviews(profileId:string){
    this.api.getProfileReviews(profileId).subscribe(res=>{
      console.log(res);      
      console.log(this.profileReviews);
      
      console.log(res.profileReviews[0]);
      

      this.profileReviews = res.profileReviews
      console.log(this.profileReviews);

    })
  }

  getReviewsByUser(userId:string){
    this.api.getReviewsByUser(userId).subscribe(res=>{
      console.log(res);      
      console.log(this.reviews);
      
      console.log(res.reviews[0]);
      

      this.reviews = res.reviews
      console.log(this.reviews);

    })
  }



  deleteReview(reviewId:string){
    this.api.deleteReview(reviewId).subscribe(res=>{
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

      this.getSpecialistProfileReviews(this.profileId)
      }
    })

  }

  

}
