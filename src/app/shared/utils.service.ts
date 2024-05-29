import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  random(min: number, max: number): number {
    // Min and max can be returned
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
