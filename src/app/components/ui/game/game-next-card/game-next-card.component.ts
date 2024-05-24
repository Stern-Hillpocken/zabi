import { Component, Input } from '@angular/core';
import { Card } from 'src/app/models/card.model';

@Component({
  selector: 'app-game-next-card',
  templateUrl: './game-next-card.component.html',
  styleUrls: ['./game-next-card.component.scss']
})
export class GameNextCardComponent {

  @Input() nextCard!: Card;

}
