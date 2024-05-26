import { Component } from '@angular/core';
import { Choice } from 'src/app/models/choice.model';
import { GameState } from 'src/app/models/game-state.model';
import { GameStateService } from 'src/app/shared/game-state.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  gameState!: GameState;

  constructor(private gss: GameStateService) {
    this.gss.getGameState().subscribe((gs: GameState) => {
      this.gameState = gs;
      this.gss.initRitual();
    });
  }

  onCardChoiceMadeReceive(choice: Choice): void {
    this.gss.moveToNextCard();
  }

}
