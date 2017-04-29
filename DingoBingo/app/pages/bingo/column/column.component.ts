import { Component, OnInit, Input } from '@angular/core';

import {SlotValue} from "../../../shared/bingo/slot";

@Component({
	selector: 'column',
	templateUrl: 'pages/bingo/column/column.component.html',
	styleUrls: ['pages/bingo/column/column.component.css']
})
export class ColumnComponent implements OnInit {
	@Input() slots: SlotValue[];

	constructor() {}

	ngOnInit() {}
}