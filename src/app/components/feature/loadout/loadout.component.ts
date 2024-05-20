import { Component } from '@angular/core';
import { GameState } from 'src/app/models/game-state.model';
import { GameStateService } from 'src/app/shared/game-state.service';

@Component({
  selector: 'app-loadout',
  templateUrl: './loadout.component.html',
  styleUrls: ['./loadout.component.scss']
})
export class LoadoutComponent {

  gameState!: GameState;

  constructor(public gss: GameStateService) {}

  ngOnInit() {
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

}
