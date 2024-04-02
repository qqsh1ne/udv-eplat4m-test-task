import cls from './Columns.module.scss';
import AddingMenu from "./AddingMenu/AddingMenu.tsx";
import {useState} from "react";

const Column = () => {
    const [widgets, setWidgets] = useState<{type: string, id: number}[]>([]);
    const [currentId, setCurrentId] = useState<number>(0);
    const handleOnAdd = (widgetType: string) => {
        setWidgets([...widgets, {type: widgetType, id: currentId}]);
        setCurrentId(currentId + 1);
    };

    const handleOnRemove = (widgetId: number) => {
        setWidgets(widgets.filter(({id}) => id !== widgetId))
    };

    return (
        <div className={cls.column}>
            <AddingMenu onAdding={handleOnAdd}/>
            {widgets.map(({type, id}) => (
                <div key={id}>
                    {type}
                    <button onClick={() => {
                        handleOnRemove(id)
                    }}>remove</button>
                </div>
            ))}
        </div>
    );
}

export default Column;