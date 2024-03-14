import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-listing-profile',
  standalone: true,
  imports: [NavBarComponent, FooterComponent],
  templateUrl: './listing-profile.component.html',
  styleUrl: './listing-profile.component.css'
})
export class ListingProfileComponent {

}
