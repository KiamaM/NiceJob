import { ElementRef, Injectable, ViewChild } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('regDialog') regDialog!: ElementRef<HTMLDialogElement>;

  constructor() { }

  closeModal() {
    this.dialog.nativeElement.close();
    this.dialog.nativeElement.classList.remove('opened');
  }

  openModal() {
    this.dialog.nativeElement.showModal();
    this.dialog.nativeElement.classList.add('opened');
  }

  closeRegisterModal() {
    this.regDialog.nativeElement.close();
    this.regDialog.nativeElement.classList.remove('opened');
  }

  openRegisterModal() {
    this.regDialog.nativeElement.showModal();
    this.regDialog.nativeElement.classList.add('opened');

  }

  handleDialogClick(event: MouseEvent) {
    const target = event.target as Element;
    if (target.nodeName === 'DIALOG') {
      this.closeModal();
    }
  }
}
