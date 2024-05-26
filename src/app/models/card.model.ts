import { Choice } from "./choice.model";
import { MultiLanguage } from "./multi-language.model";

export class Card {
    constructor(
        public name: MultiLanguage,
        public owner: "player" | "enemy" | "empty",
        public choices: Choice[]
    ){}
}