import cls from './Column.module.scss';
import AddingMenu from "./AddingMenu/AddingMenu.tsx";
import React, {FC} from "react";
import {IWidgetItem, WidgetSettings} from "../../../types/IWidgetItem.ts";
import Widget from "../../Widgets/Widget.tsx";

type IColumnProps = {
    columnId: number,
    widgets: IWidgetItem[],
    onAdd: (widget: Omit<IWidgetItem, 'id'>) => void,
    onRemove: (widgetId: number) => void,
    onDragChange: (widgetId: number, columnId: number) => void,
    onSettingsChange: (widgetId: number, settings: WidgetSettings) => void,
}

const Column: FC<IColumnProps> = ({columnId, widgets, onAdd, onRemove, onDragChange, onSettingsChange}) => {
    const handleOnDrag = (evt: React.DragEvent<HTMLDivElement>, widgetId: number) => {
        evt.dataTransfer.setData('widgetId', widgetId.toString())
    };

    const handleOnDrop = (evt: React.DragEvent<HTMLDivElement>) => {
        onDragChange(parseInt(evt.dataTransfer.getData('widgetId')), columnId);
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    };

    return (
        <div className={cls.column}
             onDrop={handleOnDrop}
             onDragOver={handleDragOver}
        >
            <AddingMenu onAdding={onAdd} columnId={columnId}/>
            {widgets
                .filter(widget => widget.columnId === columnId)
                .map((widget) => (
                    <Widget
                        key={widget.id}
                        widget={widget}
                        onDrag={handleOnDrag}
                        onRemove={onRemove}
                        onSettingsChange={onSettingsChange}
                    />
                ))
            }
        </div>
    );
}

export default Column;