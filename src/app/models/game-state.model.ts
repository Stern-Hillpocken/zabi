import { Languages } from "../types/languages.type";
import { BattleEffect } from "./battleEffects.model";
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
        public knownEnemies: string[],
        public ritual: Ritual,
        public completedRituals: string[],
        public deck: Deck,
        public currentStep: number,
        public maxStep: number,
        public mana: number,
        public battleEffects: BattleEffect
    ){}
}