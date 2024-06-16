import { Component } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { GameState } from 'src/app/models/game-state.model';
import { DeckInformationService } from 'src/app/shared/deck-information.service';
import { GameStateService } from 'src/app/shared/game-state.service';

@Component({
  selector: 'app-loadout',
  templateUrl: './loadout.component.html',
  styleUrls: ['./loadout.component.scss']
})
export class LoadoutComponent {

  gameState!: GameState;

  constructor(public gss: GameStateService, private dis: DeckInformationService) {}

  ngOnInit() {
    this.gss.initAll();
    this.gss.getGameState().subscribe(gs => {
      this.gameState = gs;
    });
  }

  onSelectedCultReceive(englishName: string): void {
    this.gss.setCult(englishName);
  }

  onSelectedLeaderReceive(englishName: string): void {
    this.gss.setLeader(englishName);
  }

  onDisplayDeckReceive(cards: Card[]): void {
    this.dis.set(cards);
  }

}
