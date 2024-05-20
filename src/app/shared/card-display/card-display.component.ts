import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { Languages } from 'src/app/types/languages.type';

@Component({
  selector: 'app-card-display',
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.scss']
})
export class CardDisplayComponent {

  @Input() card!: Card;
  @Input() language!: Languages;

}
