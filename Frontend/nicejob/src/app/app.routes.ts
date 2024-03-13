import { Routes } from '@angular/router';
import { RegisterFormComponent } from './Components/register-form/register-form.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterSpecialistComponent } from './Components/register-specialist/register-specialist.component';

export const routes: Routes = [
    {path: 'register', component:RegisterFormComponent},
    {path: '', component:LandingPageComponent},
    {path: 'login', component:LoginComponent},
    {path: 'register-specialist', component:RegisterSpecialistComponent},  
    
];
