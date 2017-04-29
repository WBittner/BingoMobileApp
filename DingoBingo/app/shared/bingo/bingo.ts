import {Card} from "./card";
import {SpecialSlots} from "./slot";
import {shuffleArray} from "./utils";

export class Bingo {
    cards: Card[] = [];
    called: number[] = [SpecialSlots.FREE]; //free space is always called
    toBeCalled: number[] = [];

    constructor(numCards: number) {
        for(let i = 0; i < numCards; i++) {
            this.cards.push(new Card());
        }

        for(let i = 1; i <= 75; i++) {
            this.toBeCalled.push(i);
        }

        this.toBeCalled = shuffleArray(this.toBeCalled);
    }
}