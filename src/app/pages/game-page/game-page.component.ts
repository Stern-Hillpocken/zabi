import { Component } from '@angular/core';
import { GameState } from 'src/app/models/game-state.model';
import { GameStateService } from 'src/app/shared/game-state.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent {

  gameState!: GameState;

  constructor(private gss: GameStateService){
    this.gss.getGameState().subscribe((gs: GameState) => {
      this.gameState = gs;
    });
  }

}
