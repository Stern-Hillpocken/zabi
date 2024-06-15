import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-end-header',
  templateUrl: './end-header.component.html',
  styleUrls: ['./end-header.component.scss']
})
export class EndHeaderComponent {

  @Output() backToHomePageEmitter: EventEmitter<void> = new EventEmitter();

  backToHomePage(): void {
    this.backToHomePageEmitter.emit();
  }

}
