import { Routes } from '@angular/router';
import { RegisterFormComponent } from './Components/register-form/register-form.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';

export const routes: Routes = [
    {path: 'register', component:RegisterFormComponent},
    {path: '', component:LandingPageComponent},
    
];
