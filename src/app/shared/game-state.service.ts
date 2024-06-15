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
import { Choice } from '../models/choice.model';
import { BattleEffect } from '../models/battleEffects.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  private readonly _gameState$: BehaviorSubject<GameState> = new BehaviorSubject(new GameState("en", new Leader(new MultiLanguage("", ""), []), new Cult(new MultiLanguage("", ""), 0, 0, 0), new Enemy(new MultiLanguage("", ""), []), [], new Ritual({"en": "", "fr": ""}, 0, 0, 0, []), [], new Deck([], new Card(new MultiLanguage("", ""), new MultiLanguage("", ""), "player", []), new Card(new MultiLanguage("", ""), new MultiLanguage("", ""), "player", []), []), 0, 0, 0, new BattleEffect(0), "map"));

  private leaders!: Leader[];
  private cults!: Cult[];
  private enemies!: Enemy[];
  private rituals!: Ritual[];
  private cards!: Card[]

  constructor(private http: HttpClient, private utils: UtilsService, private router: Router) {
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

    this.http.get("assets/json/rituals.json").subscribe((result: any) => {
      this.rituals = [];
      for (const rit of result) {
        this.rituals.push(new Ritual(rit.name, 0, rit.value, 0, rit.rewards));
      }
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

  generateEnemy(): void {
    let randomIndex = this.utils.random(0, this.enemies.length-1);
    while (this._gameState$.value.knownEnemies.includes(this.enemies[randomIndex].name.en)) randomIndex = this.utils.random(0, this.enemies.length-1);
    
    this._gameState$.value.enemy = this.enemies[randomIndex];
    this._gameState$.value.knownEnemies.push(this.enemies[randomIndex].name.en)

    if (this._gameState$.value.knownEnemies.length === this.enemies.length) this._gameState$.value.knownEnemies = [];
  }

  setRitual(name: string): void {
    for (const rit of this.rituals) {
      if (name === rit.name.en) {
        this._gameState$.value.ritual = rit;
        this._gameState$.value.completedRituals.push(rit.name.en);
      }
    }
    this.initRitual();
    this._gameState$.value.phase = "ritual";
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
    // Remove ingame values
    this._gameState$.value.mana = 0;
    this._gameState$.value.battleEffects.scry = 0;
    this._gameState$.value.cult.hideout = 0;
    this._gameState$.value.ritual.currentProgression = 0;
    this._gameState$.value.ritual.protection = 0;
    // Add all decks in library
    while (this._gameState$.value.deck.library.length > 0) this._gameState$.value.deck.library.pop();
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
      //this._gameState$.value.battleEffects.scry ++; //to keep scry when it's apply to empty next card (because empty draw pile)
    }

    // Choose next card
    if (this._gameState$.value.deck.library.length > 0) {
      const randomNextCardIndex = this.utils.random(0, this._gameState$.value.deck.library.length-1);
      this._gameState$.value.deck.nextCard = this._gameState$.value.deck.library[randomNextCardIndex];
    }

    // Decrease battle effects
    if (this._gameState$.value.battleEffects.scry > 0) this._gameState$.value.battleEffects.scry --;
  }

  shuffle(): void {
    this._gameState$.value.deck.library = this._gameState$.value.deck.graveyard;
    this._gameState$.value.deck.graveyard = [];
    this.pickCurrentAndNextCards();
  }

  applyChoice(choice: Choice): void {
    this._gameState$.value.mana -= choice.cost;

    for (const effect of choice.effects) {
      switch(effect.keyword) {
        case "believer":
          this._gameState$.value.cult.currentBelievers += effect.value;
          if (this._gameState$.value.cult.currentBelievers > this._gameState$.value.cult.maxBelievers) this._gameState$.value.cult.currentBelievers = this._gameState$.value.cult.maxBelievers;
          break;
        case "clean":
          this._gameState$.value.ritual.currentProgression -= effect.value;
          if (this._gameState$.value.ritual.currentProgression < 0) this._gameState$.value.ritual.currentProgression = 0;
          break;
        case "glyph":
          if (this._gameState$.value.ritual.protection >= effect.value) this._gameState$.value.ritual.protection -= effect.value;
          else {this._gameState$.value.ritual.currentProgression += effect.value - this._gameState$.value.ritual.protection; this._gameState$.value.ritual.protection = 0;}
          break;
        case "hideout":
          this._gameState$.value.cult.hideout += effect.value;
          break;
        case "mana":
          this._gameState$.value.mana += effect.value;
          break;
        case "militia":
          if (this._gameState$.value.cult.hideout >= effect.value) this._gameState$.value.cult.hideout -= effect.value;
          else {this._gameState$.value.cult.currentBelievers -= effect.value - this._gameState$.value.cult.hideout; this._gameState$.value.cult.hideout = 0;}
          break;
        case "protection":
          this._gameState$.value.ritual.protection += effect.value;
          break;
        case "scry":
          if (this._gameState$.value.battleEffects.scry === 0) this._gameState$.value.battleEffects.scry ++;
          this._gameState$.value.battleEffects.scry += effect.value;
          break;
        default:
          console.log("!Error on applyChoice()!");
          console.log(effect);
      }
    }

    if (this._gameState$.value.cult.currentBelievers <= 0) this.endOfGame();
    if (this._gameState$.value.ritual.currentProgression >= this._gameState$.value.ritual.maxProgression) this.winTheRitual();
  }

  endOfGame(): void {
    this.router.navigate(['/end']);
  }

  winTheRitual(): void {
    // Go to the next map location
    this._gameState$.value.phase = "map";
    this._gameState$.value.currentStep ++;
    if (this._gameState$.value.currentStep === this._gameState$.value.maxStep) this.endOfGame();
  }

}
