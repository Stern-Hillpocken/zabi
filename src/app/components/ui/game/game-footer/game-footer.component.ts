import { Component, Input } from '@angular/core';
import { GameState } from 'src/app/models/game-state.model';

@Component({
  selector: 'app-game-footer',
  templateUrl: './game-footer.component.html',
  styleUrls: ['./game-footer.component.scss']
})
export class GameFooterComponent {

  @Input() gameState!: GameState;

}
