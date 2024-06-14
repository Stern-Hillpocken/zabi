import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { Languages } from 'src/app/types/languages.type';

@Component({
  selector: 'app-game-library',
  templateUrl: './game-library.component.html',
  styleUrls: ['./game-library.component.scss', '../../../feature/game/game.component.scss']
})
export class GameLibraryComponent {

  @Input() library!: Card[];
  @Input() language!: Languages;

  @Output() displayLibraryEmitter: EventEmitter<void> = new EventEmitter();
  
  display(): void {
    this.displayLibraryEmitter.emit();
  }

}
