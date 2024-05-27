import { Component } from '@angular/core';
import { Choice } from 'src/app/models/choice.model';
import { GameState } from 'src/app/models/game-state.model';
import { Popup } from 'src/app/models/popup.model';
import { GameStateService } from 'src/app/shared/game-state.service';
import { PopupService } from 'src/app/shared/popup.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  gameState!: GameState;

  constructor(private gss: GameStateService, private ps: PopupService) {
    this.gss.getGameState().subscribe((gs: GameState) => {
      this.gameState = gs;
      this.gss.initRitual();
    });
  }

  onCardChoiceMadeReceive(choice: Choice): void {
    if (this.gameState.mana >= choice.cost) {
      this.gss.applyChoice(choice);
      this.gss.moveToNextCard();
    } else {
      this.ps.create(new Popup(this.gameState.language === "fr" ? "Pas assez de mana" : "No enough mana", "error"));
    }
  }

}
