import {Slot, SlotValue, ColumnHeader, isColumnHeader} from "./slot";
import {Column} from "./column";

export class Card {
    columns: Column[] = [];

    constructor() {
        for(let key in ColumnHeader) {
            if(isColumnHeader(key)) {
                this.columns.push(new Column(key));
            }
        }
    }

    getCard() {
        let slots: SlotValue[][] = [];

        this.columns.forEach(function(column, index, array) {
            slots.push(column.slots);
        });

        return slots;
    }

    /**
     * Get's a coord, ignoring the column header.
     */
    getCoord(rowNum: number, colNum: number) {
        return this.columns[colNum].slots[rowNum+1];
    }

    getCol(colNum: number) {
        return this.columns[colNum].slots.filter(function(value, index, array) {
            return index !== 0; // don't want column header (letter)
        });
    }

    getRow(rowNum: number) {
        let row: SlotValue[] = [];
        
        this.columns.forEach(function(column, index, array) {
            row.push(column.slots[rowNum + 1]);
        });

        return row;
    }
}