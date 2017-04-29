import {Slot, SlotValue, ColumnHeader, SpecialSlots} from "./slot";
import {shuffleArray} from "./utils";

export class Column {
    slots: SlotValue[]

    static columnRangeMap:{[key: string]: Range}  = {
        [ColumnHeader.B]: { minValue: 1, maxValue: 15},
        [ColumnHeader.I]: { minValue: 16, maxValue: 30},
        [ColumnHeader.N]: { minValue: 31, maxValue: 45},
        [ColumnHeader.G]: { minValue: 46, maxValue: 60},
        [ColumnHeader.O]: { minValue: 61, maxValue: 75}
    }

    constructor(columnHeader: ColumnHeader) {
        this.slots = Column.generateColumn(columnHeader);
    }

    static generateColumn(columnHeader: ColumnHeader) {
        let slots: SlotValue[] = [];

        slots.push(columnHeader);

        let possibleValues: number[] = [];
        for(let i = Column.columnRangeMap[columnHeader].minValue; 
            i <= Column.columnRangeMap[columnHeader].maxValue; i++) {
                possibleValues.push(i);
        }

        possibleValues = shuffleArray(possibleValues);

        for(let i = 0; i < 5; i++) {
            slots.push(possibleValues.pop());
        }

        if(columnHeader === ColumnHeader.N) {
            slots[3] = SpecialSlots.FREE;
        }

        return slots;
    }
}

interface Range {
    minValue: number;
    maxValue: number;
}