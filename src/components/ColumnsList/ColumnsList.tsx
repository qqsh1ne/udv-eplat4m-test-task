import Column from "./Column/Column.tsx";
import cls from './ColumnsList.module.scss';
import {useState} from "react";
import {IWidgetItem, WidgetSettings} from "../../types/IWidgetItem.ts";
import {COLUMNS_LIST} from "../../consts.ts";

const ColumnsList = () => {
    const [widgets, setWidgets] = useState<IWidgetItem[]>([]);
    const [currentId, setCurrentId] = useState<number>(0);

    const handleOnAdd = (widget: Omit<IWidgetItem, 'id'>) => {
        setWidgets([...widgets, {...widget, id: currentId}]);
        setCurrentId(currentId + 1);
    };

    const handleOnRemove = (widgetId: number) => {
        setWidgets(widgets.filter(({id}) => id !== widgetId))
    };

    const handleOnDragChanges = (widgetId: number, columnId: number) => {
        const widget = widgets.find(w => w.id === widgetId)!;
        if (widget.columnId === columnId) {
            return;
        }
        widget.columnId = columnId;
        setWidgets([...widgets.filter(w => w.id !== widget.id), widget])
    };

    const handleOnSettingsChange = (widgetId: number, settings: WidgetSettings) => {
        let widget = widgets.find(({id}) => id === widgetId)!;
        widget = {...widget, settings};
        setWidgets([...widgets.filter(widget => widget.id !== widgetId), widget])
    };

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
                    onSettingsChange={handleOnSettingsChange}
                />
            ))}
        </div>
    );
}

export default ColumnsList;