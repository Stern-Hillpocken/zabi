import { Card } from "./card.model";
import { MultiLanguage } from "./multi-language.model";

export class Enemy {
    constructor (
        public name: MultiLanguage,
        public cards: Card[]
    ){}
}