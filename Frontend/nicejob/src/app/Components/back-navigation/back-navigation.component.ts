import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-back-navigation',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './back-navigation.component.html',
  styleUrl: './back-navigation.component.css'
})
export class BackNavigationComponent {

  constructor(private location:Location){}

  goBack(): void {
    this.location.back();
  }

}
