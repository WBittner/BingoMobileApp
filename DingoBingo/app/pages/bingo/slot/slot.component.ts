import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { SlotValue } from "../../../shared/bingo/slot";
import { Label } from "ui/label";

@Component({
	selector: 'slot',
	templateUrl: 'pages/bingo/slot/slot.component.html',
	styleUrls: ['pages/bingo/slot/slot.component.css']
})
export class SlotComponent implements OnInit {
	@Input() value: SlotValue;

	@ViewChild("label")
	label: ElementRef;

	constructor() {}

	ngOnInit() {}

	toggle() {
		let label = <Label>this.label.nativeElement;
		
		label.className = label.className === "uncalled"? "called" : "uncalled";
	}
}