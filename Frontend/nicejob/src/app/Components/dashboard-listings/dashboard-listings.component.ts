import { Component } from '@angular/core';
import { profile } from '../../Interfaces/profile.interface';
import { ApiService } from '../../Services/api.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SearchPipePipe } from '../../Pipes/search-pipe.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-listings',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, SearchPipePipe,FormsModule, ReactiveFormsModule],
  templateUrl: './dashboard-listings.component.html',
  styleUrl: './dashboard-listings.component.css' 
})
export class DashboardListingsComponent {


  filter = ''

  errorMsg!:string
  successMsg!:string

  emptyDisplay!:boolean

  visible = false
  visible2 = false

  filteredProfiles!:profile[]


  id!:string

  userId!:string

  profile!:profile

  profiles:profile[] = []


  constructor(private api:ApiService){
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






}
