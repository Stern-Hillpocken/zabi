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
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  private readonly _gameState$: BehaviorSubject<GameState> = new BehaviorSubject(new GameState("en", new Leader(new MultiLanguage("", ""), []), new Cult(new MultiLanguage("", ""), 0, 0, 0), new Enemy(new MultiLanguage("", ""), []), new Ritual({"en": "", "fr": ""}, 0, 0, 0), new Deck([], new Card(new MultiLanguage("", ""), new MultiLanguage("", ""), "player", []), new Card(new MultiLanguage("", ""), new MultiLanguage("", ""), "player", []), []), 0, 0, 0));

  private leaders!: Leader[];
  private cults!: Cult[];
  private enemies!: Enemy[];
  private cards!: Card[]

  constructor(private http: HttpClient, private utils: UtilsService) {
    this.http.get("assets/json/cards.json").subscribe((result: any) => {
      this.cards = result;

      this.http.get("assets/json/leaders.json").subscribe((result: any) => {
        for (let l = 0; l < result.length; l++) {
          for (let c = 0; c < result[l].cards.length; c++) {
            result[l].cards[c] = this.convertEnglishNameToCard(result[l].cards[c]);
          }
        }
        this.leaders = result;
      });
      this.http.get("assets/json/enemies.json").subscribe((result: any) => {
        for (let e = 0; e < result.length; e++) {
          for (let c = 0; c < result[e  ].cards.length; c++) {
            result[e].cards[c] = this.convertEnglishNameToCard(result[e].cards[c]);
          }
        }
        this.enemies = result;
      });
    });

    this.http.get("assets/json/cults.json").subscribe((result: any) => {
      this.cults = result;
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

  convertEnglishNameToCard(name: string): Card {
    for(const card of this.cards) {
      if (card.name.en === name) {
        return card;
      }
    }
    return new Card({"en": name+" does'nt exist!", "fr": name+" n'existe pas !"}, new MultiLanguage("", ""), "enemy", []);
  }

  initRitual(): void {
    // Add all decks in library
    this._gameState$.value.deck.library.push(...this._gameState$.value.leader.cards);
    this._gameState$.value.deck.library.push(...this._gameState$.value.enemy.cards);
    this.pickCurrentAndNextCards();
  }

  pickCurrentAndNextCards(): void {
    // Choose current card
    const randomFirstCardIndex = this.utils.random(0, this._gameState$.value.deck.library.length-1);
    this._gameState$.value.deck.currentCard = this._gameState$.value.deck.library[randomFirstCardIndex];
    this._gameState$.value.deck.library.splice(randomFirstCardIndex, 1);
    // Choose next card
    const randomNextCardIndex = this.utils.random(0, this._gameState$.value.deck.library.length-1);
    this._gameState$.value.deck.nextCard = this._gameState$.value.deck.library[randomNextCardIndex];
  }

  moveToNextCard(): void {
    // Move current card to graveyard
    this._gameState$.value.deck.graveyard.push(this._gameState$.value.deck.currentCard);

    // Set next card to current card
    if (this._gameState$.value.deck.nextCard.name.en) {
      this._gameState$.value.deck.currentCard = this._gameState$.value.deck.nextCard;
      // Remove it from library
      for (let i = 0; i < this._gameState$.value.deck.library.length; i++) {
        if (this._gameState$.value.deck.library[i] === this._gameState$.value.deck.nextCard) {
          this._gameState$.value.deck.library.splice(i, 1);
          break;
        }
      }
      this._gameState$.value.deck.nextCard = new Card(new MultiLanguage("", ""), new MultiLanguage("", ""), "empty", []);
    } else {
      this.shuffle();
    }

    // Choose next card
    if (this._gameState$.value.deck.library.length > 0) {
      const randomNextCardIndex = this.utils.random(0, this._gameState$.value.deck.library.length-1);
      this._gameState$.value.deck.nextCard = this._gameState$.value.deck.library[randomNextCardIndex];
    }
  }

  shuffle(): void {
    this._gameState$.value.deck.library = this._gameState$.value.deck.graveyard;
    this._gameState$.value.deck.graveyard = [];
    this.pickCurrentAndNextCards();
  }

}
