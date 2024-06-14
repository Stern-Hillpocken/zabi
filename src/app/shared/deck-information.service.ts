import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class DeckInformationService {

  private readonly _listOfCards$: BehaviorSubject<Card[]> = new BehaviorSubject([new Card({"en":"", "fr":""},{"en":"", "fr":""},"empty",[])]);

  constructor() {
    this.remove();
  }

  get(): Observable<Card[]> {
    return this._listOfCards$.asObservable();
  }

  set(cards: Card[]): void {
    this._listOfCards$.value.push(...cards);
  }

  remove(): void {
    while(this._listOfCards$.value.length > 0) this._listOfCards$.value.pop();
  }
}
