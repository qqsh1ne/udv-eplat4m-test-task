import {Button, Dropdown, MenuProps} from "antd";
import {FC} from "react";

const AddingMenu: FC<{ onAdding: (widgetType: string, columnId: number) => void, columnId: number}> = ({onAdding, columnId}) => {
    const items: MenuProps['items'] = [
        {
            key: 'weather',
            label: (
                <div onClick={() => {
                    onAdding('weather', columnId);
                }}>
                    Погода
                </div>
            ),
        },
        {
            key: 'clocks',
            label: (
                <div onClick={() => {
                    onAdding('clocks', columnId);
                }}>
                    Часы
                </div>
            ),
        },
        {
            key: 'currency',
            label: (
                <div onClick={() => {
                    onAdding('currency', columnId);
                }}>
                    Валюта скуратов
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