import WidgetType from "../enums/WidgetType.ts";

export type WidgetSettings = {
    [key: string]: string;
}

export interface IWidgetItem {
    type: WidgetType,
    id: number,
    columnId: number,
    settings: WidgetSettings,
}