import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Page} from "ui/page";

import {android, AndroidApplication} from "application";
import {topmost} from "ui/frame";

import {setTimeout, clearTimeout} from "timer";

import {SlotValue} from "../../shared/bingo/slot";
import {Card} from "../../shared/bingo/card";
import {BingoService} from "../../shared/bingo/bingo.service";

@Component({
    selector: "bingo",
    templateUrl: "pages/bingo/bingo.html",
    styleUrls: ["pages/bingo/bingo.component.css"],
    providers: [BingoService]
})
export class BingoComponent implements OnInit {
    cardsBingod: boolean[];
    gameEndTimeout: number;
    calls: number[];
    cards: SlotValue[][][];
    activity;

    constructor(private router: Router, private page: Page, private bingoService: BingoService) {
        this.cardsBingod = [false,false,false,false];
        this.calls = [];
        this.cards = this.bingoService.getCards();

        this.bingoService.onNewCall = this.onNewCall.bind(this);

        android.on("activityPaused", this.onPause, this);
        android.on("activityResumed", this.onResume, this);
        android.on(AndroidApplication.activityBackPressedEvent, this.onBackPress, this);
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
        //this.page.backgroundImage = "res://bg_login"; TODO: image?
    }

    onNewCall(call: number) {
        this.calls.unshift(call);
    }

    onPause() {
        this.bingoService.pause();
    }

    onResume() {
        this.bingoService.resume();
    }

    onBackPress() {
        this.router.navigate(["options"]);
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
}