import {Injectable} from "@angular/core";
import {setInterval, clearInterval} from "timer";

import {Bingo} from "./bingo";
import {SlotValue} from "./slot";
import {InitOptionsService} from "../initOptions.service";

/**
 * Service used to play some bingo!!!!!
 */
@Injectable()
export class BingoService {
    bingo: Bingo;
    callInterval: number;
    numSecondsSinceLastCall: number;
    interval: number;
    onNewCall: (number) => void;

    constructor(initOptionsService: InitOptionsService) {
        this.callInterval = initOptionsService.options.callInterval;
        this.bingo = new Bingo(initOptionsService.options.numCards);
        this.numSecondsSinceLastCall = 0;

        this.startInterval();
    }

    pause() {
        this.clearInterval();
    }

    resume() {
        this.startInterval();
    }

    clearInterval() {
        if(this.interval) {
            clearInterval(this.interval);
        }
        this.interval = undefined;
    }

    startInterval() {
        //Just in case - don't want like 10 versions of this going somehow
        if(this.interval) {
            this.clearInterval();
        }
        this.interval = setInterval(this.tick.bind(this), 1000);
    }

    tick() {
        if(++this.numSecondsSinceLastCall === this.callInterval) {
            this.callNumber();
            this.numSecondsSinceLastCall = 0;
        }
    }

    callNumber() {
        let number = this.bingo.toBeCalled.shift();

        if(number) {
            this.bingo.called.unshift(number);
            if(typeof this.onNewCall === "function") {
                this.onNewCall(number);
            }
        } else {
            clearInterval(this.interval);
            alert("wow you suck at bingo..");
        }  
    }

    getCards() {
        let vals: SlotValue[][][] = [];

        this.bingo.cards.forEach(function(card, index, array) {
            vals.push(card.getCard());
        });

        return vals;
    }

    getCard(id: number) {
        return this.bingo.cards[id].getCard();
    }

    checkBingo(id: number) {
        let card = this.bingo.cards[id];
        let forwardDiag = 0;

        //Check diag values
        for(let i = 0; i < 5; i ++) {
            if(this.bingo.called.indexOf(card.getCoord(i,i)) !== -1) {
                //If diag is there, have to check the row/column
                if(this.checkSlots(card.getCol(i))) {
                    return true;
                } else if(this.checkSlots(card.getRow(i))) {
                    return true;
                }

                //Also increment the diag counter - if all 5 are called that's a win
                forwardDiag++;
            }
        }

        //Check forward diag
        if(forwardDiag === 5) {
            return true;
        }

        //Check backward diag
        if(this.checkSlots([card.getCoord(0,4), card.getCoord(1,3), card.getCoord(2,2),
                card.getCoord(3,1), card.getCoord(4,0)])) {
            return true;
        }

        return false;
    }

    private checkSlots(slots: SlotValue[]) {
        return slots.every(function(slotValue, index, array) {
            return this.wasCalled(slotValue);
        }.bind(this));
    }

    private wasCalled(slotValue) {
        return this.bingo.called.indexOf(slotValue) !== -1;
    }
}