import {Button, Dropdown, MenuProps} from "antd";
import {FC} from "react";
import WidgetType from "../../../../enums/WidgetType.ts";
import {IWidgetItem} from "../../../../types/IWidgetItem.ts";

const AddingMenu: FC<{ onAdding: (widget: Omit<IWidgetItem, 'id'>) => void, columnId: number}> = ({onAdding, columnId}) => {
    const items: MenuProps['items'] = [
        {
            key: WidgetType.Weather,
            label: (
                <div onClick={() => {
                    onAdding({type: WidgetType.Weather, columnId: columnId, settings: {city: 'Екатеринбург'}});
                }}>
                    Погода
                </div>
            ),
        },
        {
            key: WidgetType.Clocks,
            label: (
                <div onClick={() => {
                    onAdding({type: WidgetType.Clocks, columnId: columnId, settings: {}});
                }}>
                    Часы
                </div>
            ),
        },
    ];

    return (
        <Dropdown menu={{ items }} placement="bottom">
            <Button>Добавить виджет</Button>
        </Dropdown>
    )
};

export default AddingMenu;