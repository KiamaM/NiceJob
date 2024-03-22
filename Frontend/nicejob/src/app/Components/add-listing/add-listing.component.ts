import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { BackNavigationComponent } from '../back-navigation/back-navigation.component';

@Component({
  selector: 'app-add-listing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavBarComponent, FooterComponent, RouterOutlet, BackNavigationComponent],
  templateUrl: './add-listing.component.html',
  styleUrl: './add-listing.component.css'
})
export class AddListingComponent {

  serviceForm!: FormGroup
  successMsg: string = ''
  showSuccessMessage: boolean = false

  constructor(private route: Router, private fb: FormBuilder) {

  }

  onSubmit() {

  }

  BackToDashboard(){
    this.route.navigate(['admin'])
  }

}
