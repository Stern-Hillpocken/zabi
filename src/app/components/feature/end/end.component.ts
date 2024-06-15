import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameState } from 'src/app/models/game-state.model';
import { GameStateService } from 'src/app/shared/game-state.service';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent {

  gameState!: GameState;

  constructor(private gss: GameStateService, private router: Router) {
    this.gss.getGameState().subscribe((gs: GameState) => {
      this.gameState = gs;
    });
  }

  onBackToHomePageReceive(): void {
    this.router.navigate(['/']);
  }

}
