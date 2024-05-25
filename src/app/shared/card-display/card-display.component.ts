import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { Languages } from 'src/app/types/languages.type';
import { GameStateService } from '../game-state.service';
import { GameState } from 'src/app/models/game-state.model';

@Component({
  selector: 'app-card-display',
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.scss']
})
export class CardDisplayComponent {

  @Input() card!: Card;

  language!: Languages;

  constructor(private gss: GameStateService) {
    this.gss.getGameState().subscribe((gs: GameState) => {
      this.language = gs.language;
    });
  }

}
