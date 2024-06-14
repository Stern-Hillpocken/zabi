import { Component } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { DeckInformationService } from '../deck-information.service';

@Component({
  selector: 'app-deck-information',
  templateUrl: './deck-information.component.html',
  styleUrls: ['./deck-information.component.scss']
})
export class DeckInformationComponent {

  cards!: Card[];

  constructor(private dis: DeckInformationService) {
    this.dis.get().subscribe((c: Card[]) => {
      this.cards = c;
    });
  }

  close(): void {
    this.dis.remove();
  }

}
