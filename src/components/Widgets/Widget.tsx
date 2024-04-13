import React, {FC} from "react";
import WidgetType from "../../enums/WidgetType.ts";
import ClocksWidget from "./ClocksWidget/ClocksWidget.tsx";
import WeatherWidget from "./WeatherWidget/WeatherWidget.tsx";
import cls from './Widget.module.scss';
import {IWidgetItem, WidgetSettings} from "../../types/IWidgetItem.ts";

interface IWidgetProps {
    widget: IWidgetItem
    onDrag: (evt: React.DragEvent<HTMLDivElement>, widgetId: number) => void,
    onRemove: (widgetId: number) => void,
    onSettingsChange: (widgetId: number, settings: WidgetSettings) => void,
}

export interface ITypedWidgetProps {
    settings: WidgetSettings,
    onSettingsChange: (settings: WidgetSettings) => void,
}

const Widget: FC<IWidgetProps> = ({widget, onDrag, onRemove, onSettingsChange}) => {

    const getTypedWidget = () => {
        switch (widget.type) {
            case WidgetType.Clocks:
                return <ClocksWidget
                    settings={widget.settings}
                    onSettingsChange={(settings) => {onSettingsChange(widget.id, {...settings})}}
                />
            case WidgetType.Weather:
                return <WeatherWidget
                    settings={widget.settings}
                    onSettingsChange={(settings) => {onSettingsChange(widget.id, {...settings})}}
                />
        }
    }

    return (
        <div
            className={cls.widgetWrapper}
            draggable
            onDragStart={(evt) => {
                onDrag(evt, widget.id)
            }}
        >
            {getTypedWidget()}
            <button onClick={() => {
                onRemove(widget.id)
            }}>
                remove
            </button>
        </div>
    )
};

export default Widget;