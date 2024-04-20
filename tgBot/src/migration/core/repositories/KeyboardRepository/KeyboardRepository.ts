import { KeyboardRow } from "../../model/KeyboardRow/KeyboardRow";

export abstract class Keyboard {
    protected rows: KeyboardRow[] = [];

    addRow(row: KeyboardRow): void {
        this.rows.push(row);
    }

    getKeyboard(): KeyboardRow[] {
        return this.rows;
    }
}