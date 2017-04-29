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
        this.router.navigate(["bingo"]);
    }
}