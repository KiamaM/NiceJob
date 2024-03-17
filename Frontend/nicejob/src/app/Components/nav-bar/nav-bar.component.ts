import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { BackNavigationComponent } from '../back-navigation/back-navigation.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLinkActive, RouterOutlet, RouterLinkActive, CommonModule, RouterLink, LoginComponent, RegisterFormComponent, BackNavigationComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent{  
  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('regDialog') regDialog!: ElementRef<HTMLDialogElement>;


  closeModal() {
    this.dialog.nativeElement.close();
    this.dialog.nativeElement.classList.remove('opened');
  }

  openModal() {
    this.dialog.nativeElement.showModal();
    this.dialog.nativeElement.classList.add('opened');
  }

  ngAfterViewInit() {
    this.dialog.nativeElement.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as Element;
      if (target.nodeName === 'DIALOG') {
        this.closeModal();
      }
    });

    this.regDialog.nativeElement.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as Element;
      if (target.nodeName === 'DIALOG') {
        this.closeRegisterModal();
      }
    });
  }

  closeRegisterModal() {
    this.regDialog.nativeElement.close();
    this.regDialog.nativeElement.classList.remove('opened');
  }

  openRegisterModal() {
    this.regDialog.nativeElement.showModal();
    this.regDialog.nativeElement.classList.add('opened');
  }


}
