import { Rewards } from "../types/rewards.type";
import { MultiLanguage } from "./multi-language.model";

export class Ritual {
    constructor (
        public name: MultiLanguage,
        public currentProgression: number,
        public maxProgression: number,
        public protection: number,
        public rewards: Rewards[]
    ){}
}