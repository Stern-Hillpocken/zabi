export class Popup {
    constructor (
        public message: string,
        public type: "error" | "information" | "success"
    ) {}
}