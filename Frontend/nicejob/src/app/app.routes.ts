import { Routes } from '@angular/router';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { LoginComponent } from './Components/login/login.component';
import { ViewListingsComponent } from './Components/view-listings/view-listings.component';
import { ListingProfileComponent } from './Components/listing-profile/listing-profile.component';
import { AppointmentPageComponent } from './Components/appointment-page/appointment-page.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { SpecialistDashboardComponent } from './Components/specialist-dashboard/specialist-dashboard.component';
import { ClientDashboardComponent } from './Components/client-dashboard/client-dashboard.component';
import { AddListingComponent } from './Components/add-listing/add-listing.component';
import { WildCardComponent } from './Components/wild-card/wild-card.component';
import { RegisterFormComponent } from './Components/register-form/register-form.component';
import { ViewClientsComponent } from './Components/view-clients/view-clients.component';
import { ViewSpecialistsComponent } from './Components/view-specialists/view-specialists.component';
import { ListingsTableComponent } from './Components/listings-table/listings-table.component';
import { ReviewsComponent } from './Components/reviews/reviews.component';
import { SpecialistsTableComponent } from './Components/specialists-table/specialists-table.component';

export const routes: Routes = [
    {path: '', component:LandingPageComponent},
    {path: 'login', component:LoginComponent},
    {path: 'register', component:RegisterFormComponent},
    {path: 'listings', component:ViewListingsComponent},  
    {path: 'listing-profile', component:ListingProfileComponent},   
    {path: 'appointment-page', component:AppointmentPageComponent}, 
    {path: 'reset-password', component:ResetPasswordComponent},  
 




    {path: 'admin-dashboard', component:AdminDashboardComponent,

    children:[
        {path: 'view-clients', component:ViewClientsComponent},  
        {path: 'view-specialists', component:ViewSpecialistsComponent},  
        {path: 'dashboard-profiles', component:ListingsTableComponent}, 
    ]
},  
    
    



    {path: 'client-dashboard', component:ClientDashboardComponent,

    children:[
        {path: 'specialist-profiles', component:SpecialistsTableComponent}, 
        {path: 'appointment-page', component:AppointmentPageComponent}, 
    ]
},     





    {path: 'specialist-dashboard', component:SpecialistDashboardComponent,
    children:[
        {path: 'reviews', component:ReviewsComponent},   
        {path: 'dashboard-profiles', component:ListingsTableComponent},  

    ]


},  
    {path: 'add-listing', component:AddListingComponent},  
    {path:'**', component:WildCardComponent},         
    
];
