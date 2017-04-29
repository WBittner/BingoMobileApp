import { Component, OnInit, Input} from '@angular/core';

import {BingoService} from "../../../shared/bingo/bingo.service";
import {SlotValue} from "../../../shared/bingo/slot";

@Component({
	selector: 'callBoard',
	templateUrl: 'pages/bingo/callBoard/callBoard.component.html',
	styleUrls: ['pages/bingo/callBoard/callBoard.component.css']
})
export class CallBoardComponent implements OnInit {

	@Input() calls: number[];

	constructor() {}

	ngOnInit() {}

	onTap() {
		alert(this.calls);
	}
}