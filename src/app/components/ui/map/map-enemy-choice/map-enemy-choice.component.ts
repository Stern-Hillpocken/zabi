import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { Enemy } from 'src/app/models/enemy.model';
import { UtilsService } from 'src/app/shared/utils.service';
import { Languages } from 'src/app/types/languages.type';

@Component({
  selector: 'app-map-enemy-choice',
  templateUrl: './map-enemy-choice.component.html',
  styleUrls: ['./map-enemy-choice.component.scss']
})
export class MapEnemyChoiceComponent {

  @Input() language!: Languages;

  @Output() selectedEnemyEmitter: EventEmitter<string> = new EventEmitter();

  enemies: Enemy[] = [];
  allEnemies: Enemy[] = [];

  constructor(private http: HttpClient, private utils: UtilsService) {
    this.http.get("assets/json/enemies.json").subscribe((allJsonEnemies: any) => {
      this.http.get("assets/json/cards.json").subscribe((allJsonCards: any) => {
        for (let jenemy of allJsonEnemies) {
          let deckOfCards: Card[] = [];
          for (let card of jenemy.cards) {
            for (let jcards of allJsonCards) {
              if (jcards.name.en === card) {
                deckOfCards.push(jcards);
              }
            }
          }
          this.allEnemies.push(new Enemy(jenemy.name, deckOfCards));
        }
        this.generateEnemies();
      });
    });
  }

  generateEnemies(): void {
    this.enemies = [];
    let first = this.utils.random(0, this.allEnemies.length);
    let second = first;
    while (second === first) {
      second = this.utils.random(0, this.allEnemies.length);
    }
    this.enemies.push(this.allEnemies[first]);
    this.enemies.push(this.allEnemies[second]);
  }

  selectEnemy(name: string): void {
    this.selectedEnemyEmitter.emit(name);
  }

}
