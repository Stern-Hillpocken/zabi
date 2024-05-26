import { Component, Input } from '@angular/core';
import { GameState } from 'src/app/models/game-state.model';

@Component({
  selector: 'app-game-header',
  templateUrl: './game-header.component.html',
  styleUrls: ['./game-header.component.scss', '../../../feature/game/game.component.scss']
})
export class GameHeaderComponent {

  @Input() gameState!: GameState;

}
