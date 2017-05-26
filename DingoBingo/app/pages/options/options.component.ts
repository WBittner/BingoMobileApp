import {Component, OnInit, ElementRef, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {Page} from "ui/page";
import {TextField} from "ui/text-field";

import {InitOptionsService} from "../../shared/initOptions.service";
import {InitOptions} from "../../shared/initOptions";

@Component({
    selector: "options", // Allows to write <my-app> </my-app> to put this in other templates!
    templateUrl: "pages/options/options.html",
    styleUrls: ["pages/options/options-common.css", "pages/options/options.css"]
})
export class OptionsComponent implements OnInit {
    @ViewChild("numCardsField")
    numCardsField: ElementRef;
    @ViewChild("callIntervalField")
    callIntervalField: ElementRef;

    constructor(private router: Router, private optionsService: InitOptionsService, private page: Page) {}

    ngOnInit() {
        this.page.actionBarHidden = true;
        //this.page.backgroundImage = "res://bg_login"; TODO: image?
    }

    submit() {
        //Dismiss the keyboard
        this.numCardsField.nativeElement.dismissSoftInput();
        this.callIntervalField.nativeElement.dismissSoftInput();
        
        if(this.optionsService.isValid()) {
            this.startGame()
        } else {
            alert("Invalid options!");
        }
    }

    startGame() {
        //TODO: there needs to be a built in way in angular 2 or nativescript to say 
        // "this input field binds to a number!" Find it?
        this.optionsService.options.callInterval = parseInt(<any>this.optionsService.options.callInterval, 10);
        this.optionsService.options.numCards = parseInt(<any>this.optionsService.options.numCards, 10);
        this.router.navigate(["bingo"]);
    }
}