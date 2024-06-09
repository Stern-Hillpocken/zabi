import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { Languages } from 'src/app/types/languages.type';
import { GameStateService } from '../game-state.service';
import { GameState } from 'src/app/models/game-state.model';
import { Choice } from 'src/app/models/choice.model';
import { InformationService } from '../information.service';
import { Information } from 'src/app/models/information.model';

@Component({
  selector: 'app-card-display',
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.scss']
})
export class CardDisplayComponent {

  @Input() card!: Card;

  @Output() choiceMadeEmitter: EventEmitter<Choice> = new EventEmitter();

  language!: Languages;

  constructor(private gss: GameStateService, private infoServ: InformationService) {
    this.gss.getGameState().subscribe((gs: GameState) => {
      this.language = gs.language;
    });
  }

  choiceMade(choice: Choice): void {
    this.choiceMadeEmitter.emit(choice);
  }

  help(): void {
    let content: string [] = [];
    for (let side = 0; side < 2; side ++) {
      for (let k = 0; k < this.card.choices[side].effects.length; k++) {
        content.push(this.card.choices[side].effects[k].keyword);
      }
    }
    this.infoServ.set(new Information(this.language === "fr" ? "Mots clés de la carte" : "Card's keywords", content));
  }

}
