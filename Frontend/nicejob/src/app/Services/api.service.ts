import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { updatedUser, users } from '../Interfaces/users.interface';
import { profile } from '../Interfaces/profile.interface';
import { newReview, profileReviews, reviews } from '../Interfaces/reviews.interface';
import { newListing } from '../Interfaces/listing.interface';
import { isPlatformBrowser } from '@angular/common';
import { userAppointments } from '../Interfaces/appointment.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

  token!:string 



  constructor(@Inject(PLATFORM_ID) private platformId: object,private http:HttpClient) { 
    if (isPlatformBrowser(this.platformId)) {
      this.token= localStorage.getItem('token') as string
      this.getClients()
      this.getSpecialists()
    }

  }
  
// CLIents


  getClients(){
    return this.http.get<{clients:users[], error: string}>('http://localhost:4500/users/all-clients', {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.token
      })
    })
  }

  getOneClient(userId:string){
    return this.http.get<{client:users, error: string}>(`http://localhost:4500/users/client/${userId}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.token
      })
    })
  }

  deleteClient(id:string){
    return this.http.delete<{message:string, error:string}>(`http://localhost:4500/users/client/delete/${id}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.token
      })
    })
  }

  updateClientDetails(id:string, details:updatedUser){
    return this.http.put<{message:string, error:string}>(`http://localhost:4500/users/client/update/${id}`, details,{
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.token
      })
    })
  }



  //Specialists



  getSpecialists(){
    return this.http.get<{specialists:users[], error: string}>('http://localhost:4500/users/all-specialists', {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.token
      })
    })
  }

  getOneSpecialist(userId:string){
    return this.http.get<{client:users, error: string}>(`http://localhost:4500/users/specialist/${userId}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.token
      })
    })
  }

  deleteSpecialist(id:string){
    return this.http.delete<{message:string, error:string}>(`http://localhost:4500/users/specialist/delete/${id}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.token
      })
    })
  }

  updateSpecialistDetails(id:string, details:updatedUser){
    return this.http.put<{message:string, error:string}>(`http://localhost:4500/users/specialist/update/${id}`, details,{
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.token
      })
    })
  }




  // Specialist Profiles




  getSpecialistProfiles(){
    return this.http.get<{profiles:profile[], error: string}>('http://localhost:4500/profiles', {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.token
      })
    })
  }

  getOneSpecialistProfile(serviceId:string){
    return this.http.get<{profile:profile[], error: string}>(`http://localhost:4500/profiles/${serviceId}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.token
      })
    })
  }

  getProfilesBySpecialist(userId:string){
    return this.http.get<{profiles:profile[], error: string}>(`http://localhost:4500/profiles/my-profiles/${userId}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.token
      })
    })
  }

  deleteSpecialistProfile(id:string){
    return this.http.delete<{message:string, error:string}>(`http://localhost:4500/profiles/delete/${id}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.token
      })
    })
  }



  // Listings


  addListing(listingDetails:newListing){
    return this.http.post<{message:string, error:string}>('http://localhost:4500/listings', listingDetails )
  }





  //Appointments




  getAppointments(userId:string){
    return this.http.get<{appointments:userAppointments[],message:string, error: string}>(`http://localhost:4500/appointments/${userId}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.token
      })
    })
  }


  scheduleAppointment(Details: details){
    console.log(Details);
    
    return this.http.post<{message:string, error:string}>('http://localhost:4500/appointments', Details, {
      // headers: new HttpHeaders({
      //   'Content-type': 'application/json',
      //   'token': this.token
      // })
    })
  }






  //Reviews

  addReviews(userId:string, profileId:string, review:string,rating:number ){
    return this.http.post<{message:string, error:string}>('http://localhost:4500/reviews', {userId: userId,profileId: profileId,review: review, rating: rating})
  }




  getReviews(){
    return this.http.get<{reviews:reviews[], error: string}>(' http://localhost:4500/reviews', {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.token
      })
    })
  }

  getProfileReviews(profileId:string){
    return this.http.get<{profileReviews:profileReviews[], error: string}>( `http://localhost:4500/reviews/profile-reviews/${profileId}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.token
      })
    })
  }


  getReviewsByUser(userId:string){
    return this.http.get<{reviews:reviews[], error: string}>(`http://localhost:4500/reviews/user-reviews/${userId}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.token
      })
    })
  }


getOneReview(reviewId:string){
  return this.http.get<{client:users, error: string}>(`http://localhost:4500/reviews/review/${reviewId}`, {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'token': this.token
    })
  })
}

deleteReview(id:string){
  return this.http.delete<{message:string, error:string}>(`http://localhost:4500reviews//delete-review/${id}`, {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'token': this.token
    })
  })
}

updateReview(id:string, details:updatedUser){
  return this.http.put<{message:string, error:string}>(`http://localhost:4500/reviews/update-review/${id}`, details,{
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'token': this.token
    })
  })
}









}
interface details{
  userId: string,
  listingId: string
}
