import cls from './Columns.module.scss';
import AddingMenu from "./AddingMenu/AddingMenu.tsx";
import React, {FC} from "react";
import {IWidget} from "../../../types/IWidget.ts";

type IColumnProps = {
    columnId: number,
    widgets: IWidget[],
    onAdd: (widgetType: string, columnId: number) => void,
    onRemove: (widgetId: number) => void,
    onDragChange: (widgetId: number, columnId: number) => void,
}

const Column: FC<IColumnProps> = ({columnId, widgets, onAdd, onRemove, onDragChange}) => {
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
                .filter(w => w.columnId === columnId)
                .map(({type, id}) => (
                    <div
                        key={id}
                        draggable
                        onDragStart={(evt) => {
                            handleOnDrag(evt, id)
                        }}
                    >
                        {type}
                        <button onClick={() => {
                            onRemove(id)
                        }}>
                            remove
                        </button>
                    </div>
                ))
            }
        </div>
    );
}

export default Column;