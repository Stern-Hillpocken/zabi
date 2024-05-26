import { Component, Input } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { Languages } from 'src/app/types/languages.type';

@Component({
  selector: 'app-game-next-card',
  templateUrl: './game-next-card.component.html',
  styleUrls: ['./game-next-card.component.scss']
})
export class GameNextCardComponent {

  @Input() language!: Languages;
  @Input() nextCardOwner!: "enemy" | "player" | "empty";

}
