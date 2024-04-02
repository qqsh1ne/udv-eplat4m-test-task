import Column from "./Column/Column.tsx";
import cls from './ColumnsList.module.scss';
import {useState} from "react";
import {IWidget} from "../../types/IWidget.ts";
import {COLUMNS_LIST} from "../../consts.ts";

const ColumnsList = () => {
    const [widgets, setWidgets] = useState<IWidget[]>([]);
    const [currentId, setCurrentId] = useState<number>(0);

    const handleOnAdd = (widgetType: string, columnId: number) => {
        setWidgets([...widgets, {type: widgetType, id: currentId, columnId}]);
        setCurrentId(currentId + 1);
    };

    const handleOnRemove = (widgetId: number) => {
        setWidgets(widgets.filter(({id}) => id !== widgetId))
    };

    const handleOnDragChanges = (widgetId: number, columnId: number) => {
        const widget = widgets.find(w => w.id === widgetId) as IWidget;
        if (widget.columnId === columnId) {
            return;
        }
        widget.columnId = columnId;
        setWidgets([...widgets.filter(w => w.id !== widget.id), widget])
    }

    return (
        <div className={cls.list}>
            {Array.from({length: COLUMNS_LIST}, (_, i) => i + 1).map((id) => (
                <Column
                    columnId={id}
                    key={id}
                    widgets={widgets}
                    onAdd={handleOnAdd}
                    onRemove={handleOnRemove}
                    onDragChange={handleOnDragChanges}
                />
            ))}
        </div>
    );
}

export default ColumnsList;