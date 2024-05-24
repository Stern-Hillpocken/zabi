import { Component, Input } from '@angular/core';
import { Card } from 'src/app/models/card.model';

@Component({
  selector: 'app-game-graveyard',
  templateUrl: './game-graveyard.component.html',
  styleUrls: ['./game-graveyard.component.scss']
})
export class GameGraveyardComponent {

  @Input() graveyard!: Card[];

}
