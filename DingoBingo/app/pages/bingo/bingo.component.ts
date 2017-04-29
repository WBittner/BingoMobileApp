import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Page} from "ui/page";

import {setTimeout, clearTimeout} from "timer";

import {SlotValue} from "../../shared/bingo/slot";
import {Card} from "../../shared/bingo/card";
import {BingoService} from "../../shared/bingo/bingo.service";

@Component({
    selector: "bingo",
    templateUrl: "pages/bingo/bingo.html",
    styleUrls: ["pages/bingo/bingo-common.css", "pages/bingo/bingo.css"],
    providers: [BingoService]
})
export class BingoComponent implements OnInit {
    cardsBingod: boolean[];
    gameEndTimeout: number;
    calls: number[];
    cards: SlotValue[][][];

    constructor(private router: Router, private page: Page, private bingoService: BingoService) {
        this.cardsBingod = [false,false,false,false];
        this.calls = [];
        this.cards = this.bingoService.getCards();

        this.bingoService.onNewCall = this.onNewCall.bind(this);
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
        //this.page.backgroundImage = "res://bg_login"; TODO: image?
    }

    onNewCall(call: number) {
        this.calls.unshift(call);
    }

    bingo(cardId: number) {
        if(this.bingoService.checkBingo(cardId)) {
            this.cardsBingod[cardId] = true;

            if(this.gameEndTimeout === undefined) {
                this.bingoService.clearInterval();
                alert("BINGO! Game will end in 10 seconds!");
                this.gameEndTimeout = setTimeout(this.endGame.bind(this), 10*1000);
            }
            
            if(this.cardsBingod.every((didBingo, index, array) => {return didBingo;})) {
                clearTimeout(this.gameEndTimeout);
                this.endGame();
            }            
        } else {
            alert("You did not get bingo. :-/");
        }
    }

    endGame() {
        alert("Game over! You got " + this.cardsBingod.filter(didBingo => didBingo).length + " bingo(s) in " + this.calls.length + " calls!");
    }

    goBack() {
        this.router.navigate(["options"]);
    }
}