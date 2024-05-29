import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { Languages } from 'src/app/types/languages.type';

@Component({
  selector: 'app-game-next-card',
  templateUrl: './game-next-card.component.html',
  styleUrls: ['./game-next-card.component.scss']
})
export class GameNextCardComponent {

  @Input() nextCardOwner!: "enemy" | "player" | "empty";

  @Output() displayNextCardOwnerEmitter: EventEmitter<void> = new EventEmitter();

  displayNextCardOwner(): void {
    if (this.nextCardOwner !== "empty") this.displayNextCardOwnerEmitter.emit();
  }

}
