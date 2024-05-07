import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { BackNavigationComponent } from '../back-navigation/back-navigation.component';
import { ApiService } from '../../Services/api.service';
import { AuthService } from '../../Services/auth.service';
import { newListing } from '../../Interfaces/listing.interface';

@Component({
  selector: 'app-add-listing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavBarComponent, FooterComponent, RouterOutlet, BackNavigationComponent],
  templateUrl: './add-listing.component.html',
  styleUrl: './add-listing.component.css'
})
export class AddListingComponent {
  isLoading!:Boolean

  imageUpload:any[] = []
  imgUrl: string | null = null




  msgVisible:Boolean =  false
  msgVisible2:Boolean = false
  errorMsg!:string
  successMsg!:string

  serviceForm!: FormGroup
  showSuccessMessage: boolean = false
  userId!:string

  constructor(@Inject(PLATFORM_ID) private platformId: object, private router: Router, private fb: FormBuilder, private api:ApiService, private authservice:AuthService) {
    this.serviceForm = this.fb.group({
      serviceName: ['', Validators.required],
      serviceDescription: ['', Validators.required],
      serviceCategory: ['', [Validators.required,]],
      location: ['', [Validators.required]],
      rates:['', [Validators.required]],
      experience: ['', [Validators.required,]],
      openTime: ['', [Validators.required,]],
      closeTime: ['', [Validators.required,]],
      serviceImage: ['', [Validators.required,]],

    });
  } 

  async uploadImage(event: any){
    this.isLoading = true
        
    const target = event.target
    const files = target.files
    if(files){
        console.log(files)
        const formData = new FormData()
        formData.append("file", files[0])
        formData.append("upload_preset", "StriveCraft")
        formData.append("cloud_name", "dioueb86u")
  
        console.log(formData);
          
          
          
          await fetch('https://api.cloudinary.com/v1_1/dioueb86u/image/upload', {
            method: "POST",
            body: formData
          }).then(
            (res:any) => {
              return res.json()  
            },
            
          ).then(data=>{
            this.isLoading = false
            console.log("this is the URL",data.url);
            this.serviceForm.get('serviceImage')?.setValue(data.url)
            return data.url = this.imgUrl;
            
          }
          );
  
  
    }
        // })    
  
  
    }
  
  

  

  

  createListing(){
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('token') as string
      this.authservice.readToken(user).subscribe(res=>{
        console.log(res.info.userId);
        this.userId = res.info.userId
        console.log(this.serviceForm.value);
    
        const listingDetails = {
          serviceName: this.serviceForm.get('serviceName')?.value,
          serviceDescription:this.serviceForm.get('serviceDescription')?.value ,
          serviceCategory: this.serviceForm.get('serviceCategory')?.value,
          location: this.serviceForm.get('location')?.value,
          rates:this.serviceForm.get('rates')?.value,
          experience: this.serviceForm.get('experience')?.value,
          openTime: this.serviceForm.get('openTime')?.value,
          closeTime: this.serviceForm.get('closeTime')?.value,
          serviceImage: this.serviceForm.get('serviceImage')?.value,
          serviceId:'',
          userId:this.userId
        }
        console.log(listingDetails);
        console.log(this.userId);
        console.log(res.message);
        
        
        
    
        this.api.addListing(listingDetails).subscribe(response=>{
          if(response.message){
            console.log(response);
            this.showSuccessMessage = true
            this.successMsg = res.message
            setTimeout(() => {
              this.serviceForm.reset()   
              this.showSuccessMessage = false
              // this.router.navigate(['specialist-dashboard'])      
              
            }, 3000);
    
    
          }else{
            console.log(response.error);
            
            this.msgVisible = true
            this.errorMsg = response.error
            setTimeout(() => {
              this.msgVisible = false
            }, 5000);
          }
    
    
    
            
          },
          error=>{
            console.error(error);
            
          })
      })
    }



    } 



}
