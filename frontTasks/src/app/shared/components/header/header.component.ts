import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() public title: string = 'Menu';
  @Output() public goTo: EventEmitter<void> = new EventEmitter();

  public goToPageChild() {
    this.goTo.emit();
  }
}
