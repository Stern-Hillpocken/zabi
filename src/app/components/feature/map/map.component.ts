import { Component } from '@angular/core';
import { GameState } from 'src/app/models/game-state.model';
import { GameStateService } from 'src/app/shared/game-state.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  gameState!: GameState;

  constructor(private gss: GameStateService){
    this.gss.getGameState().subscribe((gs: GameState) => {
      this.gameState = gs;
    });
  }

  onSelectedRitualReceive(name: string): void {
    this.gss.setRitual(name);
    this.gss.generateEnemy();
  }

}
