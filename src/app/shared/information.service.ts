import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Information } from '../models/information.model';
import { Keywords } from '../types/keywords.type';

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  private readonly _informations$: BehaviorSubject<Information> = new BehaviorSubject(new Information("", []));

  constructor() { }

  get(): BehaviorSubject<Information> {
    return this._informations$;
  }

  set(info: Information): void {
    this._informations$.value.title = info.title;
    this._informations$.value.content = info.content;
  }

  clear(): void {
    this.set(new Information("", []));
  }
}
