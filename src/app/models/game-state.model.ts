import { Languages } from "../types/languages.type";
import { Cult } from "./cult.model";
import { Deck } from "./deck.model";
import { Enemy } from "./enemy.model";
import { Leader } from "./leader.model";
import { Ritual } from "./ritual.model";

export class GameState {
    constructor (
        public language: Languages,
        public leader: Leader,
        public cult: Cult,
        public enemy: Enemy,
        public ritual: Ritual,
        public deck: Deck,
        public currentStep: number,
        public maxStep: number,
        public mana: number
    ){}
}