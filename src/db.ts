import Dexie, {Table} from "dexie";
import {IWidgetItem} from "./types/IWidgetItem.ts";

export interface Widget extends IWidgetItem {
    settings: any;
}

export class DexieDB extends Dexie {
    widgets!: Table<Widget>;

    constructor() {
        super('widgets');
        this.version(1).stores({
            widgets: '++id, type, column, settings',
        });
    }
}

export const db = new DexieDB();
