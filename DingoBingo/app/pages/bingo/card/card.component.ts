import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {SlotValue} from "../../../shared/bingo/slot";

@Component({
	selector: 'card',
	templateUrl: 'pages/bingo/card/card.component.html',
	styleUrls: ['pages/bingo/card/card.component.css']
})
export class CardComponent implements OnInit {

	@Input() id: number;
	@Input() columns: SlotValue[][];
	@Input() enabled: boolean;

	@Output() onBingo = new EventEmitter<number>();	

	constructor() {}

	ngOnInit() {}

	bingoCheck() {
		this.onBingo.emit(this.id);
	}
}