import { CardEffects } from "./cardEffects.model";

export class Choice {
    constructor(
        public cost: number,
        public effects: CardEffects[]
    ){}
}