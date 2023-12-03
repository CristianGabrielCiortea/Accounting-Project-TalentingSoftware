import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent {
  @Input() title: string = 'Popup Title';
  @Input() message: string = 'Popup Message';
  @Output() closed = new EventEmitter<void>();

  closePopup() {
    this.closed.emit();
  }
}
