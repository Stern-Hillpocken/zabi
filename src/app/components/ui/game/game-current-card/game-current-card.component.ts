import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { Choice } from 'src/app/models/choice.model';

@Component({
  selector: 'app-game-current-card',
  templateUrl: './game-current-card.component.html',
  styleUrls: ['./game-current-card.component.scss']
})
export class GameCurrentCardComponent {

  @Input() currentCard!: Card;

  @Output() choiceMadeEmitter: EventEmitter<Choice> = new EventEmitter();

  onChoiceMadeReceive(choice: Choice): void {
    this.choiceMadeEmitter.emit(choice);
  }

}
