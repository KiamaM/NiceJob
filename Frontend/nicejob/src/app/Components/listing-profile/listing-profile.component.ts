import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BackNavigationComponent } from '../back-navigation/back-navigation.component';

@Component({
  selector: 'app-listing-profile',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, RouterLink, RouterLinkActive, RouterOutlet, BackNavigationComponent],
  templateUrl: './listing-profile.component.html',
  styleUrl: './listing-profile.component.css'
})
export class ListingProfileComponent {

  scrollToReview(){
    // Scroll the window smoothly to coordinates (0, 500)
    window.scrollTo({
      top: 900,
      behavior: 'smooth'
    });

  }
}
