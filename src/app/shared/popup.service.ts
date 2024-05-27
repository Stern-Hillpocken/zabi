import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Popup } from '../models/popup.model';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  private readonly _popups$: BehaviorSubject<Popup[]> = new BehaviorSubject([new Popup("", "error")]);

  constructor() {
    this._popups$.value.pop();
  }

  getPopups(): Observable<Popup[]> {
    return this._popups$.asObservable();
  }

  create(popup: Popup): void {
    this._popups$.value.push(popup);
  }

  delete(index: number): void {
    this._popups$.value.splice(index, 1);
  }
}
