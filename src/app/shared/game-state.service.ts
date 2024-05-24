import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameState } from '../models/game-state.model';
import { Leader } from '../models/leader.model';
import { Cult } from '../models/cult.model';
import { Enemy } from '../models/enemy.model';
import { Ritual } from '../models/ritual.model';
import { Deck } from '../models/deck.model';
import { Card } from '../models/card.model';
import { MultiLanguage } from '../models/multi-language.model';
import { HttpClient } from '@angular/common/http';
import { Languages } from '../types/languages.type';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  private readonly _gameState$: BehaviorSubject<GameState> = new BehaviorSubject(new GameState("en", new Leader(new MultiLanguage("", ""), []), new Cult(new MultiLanguage("", ""), 0, 0, 0), new Enemy(new MultiLanguage("", ""), []), new Ritual({"en": "", "fr": ""}, 0, 0, 0), new Deck([], new Card(new MultiLanguage("", ""), "player", []), new Card(new MultiLanguage("", ""), "player", []), []), 0, 0));

  private leaders!: Leader[];
  private cults!: Cult[];
  private enemies!: Enemy[];

  constructor(private http: HttpClient) {
    this.http.get("assets/json/cults.json").subscribe((result: any) => {
      this.cults = result;
    });
    this.http.get("assets/json/leaders.json").subscribe((result: any) => {
      this.leaders = result;
    });
    this.http.get("assets/json/enemies.json").subscribe((result: any) => {
      this.enemies = result;
    });
  }

  getGameState(): Observable<GameState> {
    return this._gameState$.asObservable();
  }

  changeLanguage() {
    if (this._gameState$.value.language === "en") this._gameState$.value.language = "fr";
    else this._gameState$.value.language = "en";
  }

  setCult(englishName: string): void {
    for (let jcult of this.cults) {
      if (jcult.name.en === englishName) {
        this._gameState$.value.cult.name = jcult.name;
        this._gameState$.value.cult.maxBelievers = jcult.maxBelievers;
        this._gameState$.value.cult.currentBelievers = jcult.maxBelievers;
        break;
      }
    }
  }

  setLeader(englishName: string): void {
    for (let jleader of this.leaders) {
      if (jleader.name.en === englishName) {
        this._gameState$.value.leader.name = jleader.name;
        this._gameState$.value.leader.cards = jleader.cards;
      }
    }
  }

  setEnemy(name: string): void {
    for (let jenemy of this.enemies) {
      if (jenemy.name.en === name) {
        this._gameState$.value.enemy.name = jenemy.name;
        this._gameState$.value.enemy.cards = jenemy.cards;
      }
    }
  }

}
