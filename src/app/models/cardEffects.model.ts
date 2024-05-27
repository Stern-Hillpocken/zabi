import { Keywords } from "../types/keywords.type";

export class CardEffects {
    constructor(
        public keyword: Keywords,
        public value: number
    ) {}
}