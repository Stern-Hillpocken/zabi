import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { Choice } from 'src/app/models/choice.model';
import { GameState } from 'src/app/models/game-state.model';
import { Leader } from 'src/app/models/leader.model';

@Component({
  selector: 'app-loadout-leaders',
  templateUrl: './loadout-leaders.component.html',
  styleUrls: ['./loadout-leaders.component.scss', '../../../../pages/loadout-page/loadout-page.component.scss']
})
export class LoadoutLeadersComponent {

  @Input() gameState!: GameState;

  @Output() selectedLeaderEmitter: EventEmitter<string> = new EventEmitter();

  leaders: Leader[] = [];
  allCards!: Card[];

  constructor(private http: HttpClient) {
    this.http.get("assets/json/leaders.json").subscribe((allJsonLeaders: any) => {
      this.http.get("assets/json/cards.json").subscribe((allJsonCards: any) => {
        this.allCards = allJsonCards;
        for (let l = 0; l < allJsonLeaders.length; l++) {
          let cards: Card[] = [];
          for (let c = 0; c < allJsonLeaders[l].cards.length; c++) {
            for (let i = 0; i < this.allCards.length; i++) {
              if (this.allCards[i].name.en === allJsonLeaders[l].cards[c]) {
                cards.push(this.allCards[i]);
                break;
              }
            }
          }
          this.leaders.push(new Leader(allJsonLeaders[l].name, cards));
        }
      });
    });
  }

  selectLeader(englishName: string): void {
    this.selectedLeaderEmitter.emit(englishName);
  }

}