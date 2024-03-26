import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { BackNavigationComponent } from '../back-navigation/back-navigation.component';
import { ApiService } from '../../Services/api.service';

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

  constructor(private router: Router, private fb: FormBuilder, private api:ApiService) {
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
    console.log(this.serviceForm.value);
    
    const listingDetails = this.serviceForm.value
    console.log(listingDetails);
    

    this.api.addListing(listingDetails).subscribe(response=>{
      if(response.message){
        console.log(response);
        setTimeout(() => {
          this.serviceForm.reset()   
          this.router.navigate(['specialist-dashboard'])      
          
        }, 3000);


      }else{
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

    } 



}
