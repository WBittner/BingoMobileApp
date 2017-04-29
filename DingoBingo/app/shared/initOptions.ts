/**
 * Options that need to be defined before the game can start!
 */
export class InitOptions {
    numCards: number;
    callInterval: number;

    constructor() {
        this.numCards = 1;
        this.callInterval = 5;
    }
}