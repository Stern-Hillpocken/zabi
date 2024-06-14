import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { Languages } from 'src/app/types/languages.type';

@Component({
  selector: 'app-game-next-card',
  templateUrl: './game-next-card.component.html',
  styleUrls: ['./game-next-card.component.scss']
})
export class GameNextCardComponent {

  @Input() nextCard!: Card;
  @Input() scryValue!: number;

  @Output() displayNextCardOwnerEmitter: EventEmitter<void> = new EventEmitter();
  @Output() displayNextCardEmitter: EventEmitter<void> = new EventEmitter();

  displayNextCardOwner(): void {
    if (this.nextCard.owner !== "empty") this.displayNextCardOwnerEmitter.emit();
  }

  displayNextCard(): void {
    this.displayNextCardEmitter.emit();
  }

}
