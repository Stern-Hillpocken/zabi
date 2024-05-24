import { Component, Input } from '@angular/core';
import { Card } from 'src/app/models/card.model';

@Component({
  selector: 'app-game-current-card',
  templateUrl: './game-current-card.component.html',
  styleUrls: ['./game-current-card.component.scss']
})
export class GameCurrentCardComponent {

  @Input() currentCard!: Card;

}
