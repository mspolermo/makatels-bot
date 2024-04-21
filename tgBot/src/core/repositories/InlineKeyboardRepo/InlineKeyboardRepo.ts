import { InlineButtonsRow } from "../../model/InlineButtonsRow/InlineButtonsRow";

export abstract class InlineKeyboardRepo {
    protected rows: InlineButtonsRow[] = [];

    addRow(row: InlineButtonsRow): void {
        this.rows.push(row);
    }

    getKeyboard(): InlineButtonsRow[] {
        return this.rows;
    }
}