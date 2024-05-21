import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameState } from 'src/app/models/game-state.model';
import { GameStateService } from 'src/app/shared/game-state.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent {

  gameState!: GameState;

  constructor(private gss: GameStateService, private router: Router){
    this.gss.getGameState().subscribe((gs: GameState) => {
      this.gameState = gs;
      if (this.gameState.maxStep === 0) this.router.navigate(['/']);
    });
  }

}
