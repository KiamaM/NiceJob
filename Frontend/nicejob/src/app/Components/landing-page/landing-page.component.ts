import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { ModalService } from '../../Services/modal.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, RouterLink, RouterOutlet, RouterLinkActive, CommonModule , RegisterFormComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  @ViewChild('regDialog') regDialog!: ElementRef<HTMLDialogElement>;

  constructor() { }

  closeRegisterModal() {
    this.regDialog.nativeElement.close();
    this.regDialog.nativeElement.classList.remove('opened');
  }

  openRegisterModal() {
    this.regDialog.nativeElement.showModal();
    this.regDialog.nativeElement.classList.add('opened');

  }

  ngAfterViewInit() {
    this.regDialog.nativeElement.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as Element;
      if (target.nodeName === 'DIALOG') {
        this.closeRegisterModal();
      }
    });
  }

}
