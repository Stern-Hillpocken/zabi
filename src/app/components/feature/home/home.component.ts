import { Component } from '@angular/core';
import { GameState } from 'src/app/models/game-state.model';
import { GameStateService } from 'src/app/shared/game-state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  gameState!: GameState;

  constructor(private gss: GameStateService) {
    this.gss.getGameState().subscribe((gs: GameState) => {
      this.gameState = gs;
    });
  }

}
