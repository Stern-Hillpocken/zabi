import { CardChoice } from "./card-choice.model";

export class Card {
    constructor(
        public id: number,
        public name: string,
        public owner: "player" | "enemy",
        public left: CardChoice,
        public right: CardChoice
    ){}
}