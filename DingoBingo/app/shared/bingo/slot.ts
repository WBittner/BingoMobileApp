export class Slot {
    static DEFAULT = 0

    value: SlotValue;

    constructor(val?: SlotValue) {
        this.value = val || Slot.DEFAULT;
    }
}

export type SlotValue = number | ColumnHeader | SpecialSlots;

export enum ColumnHeader {
    B = <any>"B",
    I = <any>"I",
    N = <any>"N",
    G = <any>"G",
    O = <any>"O"
}

export function isColumnHeader(letter: ColumnHeader | string): letter is ColumnHeader {
    return ColumnHeader[letter] === letter;
}

export enum SpecialSlots {
    FREE = <any>"X"
}