import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { Languages } from 'src/app/types/languages.type';

@Component({
  selector: 'app-game-graveyard',
  templateUrl: './game-graveyard.component.html',
  styleUrls: ['./game-graveyard.component.scss', '../../../feature/game/game.component.scss']
})
export class GameGraveyardComponent {

  @Input() graveyard!: Card[];
  @Input() language!: Languages;

  @Output() displayGraveyardEmitter: EventEmitter<void> = new EventEmitter();

  display(): void {
    this.displayGraveyardEmitter.emit();
  }

}
