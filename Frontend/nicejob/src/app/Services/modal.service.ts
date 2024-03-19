import { ElementRef, Injectable, ViewChild } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('regDialog') regDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('rolePrompt') rolePrompt!:ElementRef<HTMLDialogElement>

  constructor() { }




  closeLoginModal() {
    this.dialog.nativeElement.close();
    this.dialog.nativeElement.classList.remove('opened');
  }

  openLoginModal() {
    this.dialog.nativeElement.showModal();
    this.dialog.nativeElement.classList.add('opened');
  }

  ngAfterViewInit() {
    this.dialog.nativeElement.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as Element;
      if (target.nodeName === 'DIALOG') {
        this.closeLoginModal();
      }
    });

    this.regDialog.nativeElement.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as Element;
      if (target.nodeName === 'DIALOG') {
        this.closeRegisterModal();
      }
    });

    this.rolePrompt.nativeElement.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as Element;
      if (target.nodeName === 'DIALOG') {
        this.closerolePrompt();
      }
    });
  }

  closeRegisterModal() {
    this.regDialog.nativeElement.close();
    this.regDialog.nativeElement.classList.remove('opened');
    this.rolePrompt.nativeElement.style.display = 'none';
    this.openLoginModal()
  }

  openRegisterModal() {
    this.regDialog.nativeElement.showModal();
    this.regDialog.nativeElement.classList.add('opened');
  }

  closerolePrompt() {
    this.rolePrompt.nativeElement.close();
    this.rolePrompt.nativeElement.classList.remove('opened');
  }

  openrolePrompt() {
    this.rolePrompt.nativeElement.showModal();
    this.rolePrompt.nativeElement.classList.add('opened');
  }
}
