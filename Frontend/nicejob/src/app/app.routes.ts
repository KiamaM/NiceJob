import { Routes } from '@angular/router';
import { RegisterFormComponent } from './Components/register-form/register-form.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { LoginComponent } from './Components/login/login.component';
import { ViewListingsComponent } from './Components/view-listings/view-listings.component';
import { ListingProfileComponent } from './Components/listing-profile/listing-profile.component';

export const routes: Routes = [
    {path: 'register', component:RegisterFormComponent},
    {path: '', component:LandingPageComponent},
    {path: 'login', component:LoginComponent},
    {path: 'listings', component:ViewListingsComponent},  
    {path: 'listing-profile', component:ListingProfileComponent},      
    
];
