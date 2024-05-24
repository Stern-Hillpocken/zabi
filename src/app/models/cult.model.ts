import { MultiLanguage } from "./multi-language.model";

export class Cult {
    constructor(
        public name: MultiLanguage,
        public currentBelievers: number,
        public maxBelievers: number,
        public hideout: number
    ){}
}