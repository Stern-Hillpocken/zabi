import { Card } from "./card.model";

export class Deck {
    constructor (
        public library: Card[],
        public currentCard: Card,
        public nextCard: Card,
        public graveyard: Card[]
    ){}
}