import { Component, Input } from '@angular/core';
import { GameState } from 'src/app/models/game-state.model';

@Component({
  selector: 'app-loadout-game-stats',
  templateUrl: './loadout-game-stats.component.html',
  styleUrls: ['./loadout-game-stats.component.scss', '../../../../pages/loadout-page/loadout-page.component.scss']
})
export class LoadoutGameStatsComponent {

  @Input() gameState!: GameState;

  canGameRun(): boolean {
    if (this.gameState.leader.name.en !== "" && this.gameState.cult.name.en !== "" && this.gameState.maxStep !== 0) return true;
    else return false;
  }

  setStep(value: number): void {
    this.gameState.maxStep = value;
  }
  
  removeStep(): void {
    if (this.gameState.maxStep > 1) this.gameState.maxStep --;
  }

  addStep(): void {
    this.gameState.maxStep ++;
  }

  seeInConsole(): void {
    console.log(this.gameState)
  }

}
