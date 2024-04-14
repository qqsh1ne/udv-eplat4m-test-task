import {IWidgetItem, WidgetSettings} from "./IWidgetItem.ts";
import React from "react";

export interface IWidgetProps {
    widget: IWidgetItem
    onDrag: (evt: React.DragEvent<HTMLDivElement>, widgetId: number) => void,
    onRemove: (widgetId: number) => void,
    onSettingsChange: (widgetId: number, settings: WidgetSettings) => void,
}

export interface ITypedWidgetProps {
    settings: WidgetSettings,
    onSettingsChange: (settings: WidgetSettings) => void,
}