import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { Languages } from 'src/app/types/languages.type';
import { GameStateService } from '../game-state.service';
import { GameState } from 'src/app/models/game-state.model';
import { Choice } from 'src/app/models/choice.model';

@Component({
  selector: 'app-card-display',
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.scss']
})
export class CardDisplayComponent {

  @Input() card!: Card;

  @Output() choiceMadeEmitter: EventEmitter<Choice> = new EventEmitter();

  language!: Languages;

  constructor(private gss: GameStateService) {
    this.gss.getGameState().subscribe((gs: GameState) => {
      this.language = gs.language;
    });
  }

  choiceMade(choice: Choice): void {
    this.choiceMadeEmitter.emit(choice);
  }

}
