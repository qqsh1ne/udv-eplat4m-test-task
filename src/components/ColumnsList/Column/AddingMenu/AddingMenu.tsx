import {Button, Dropdown, MenuProps} from "antd";
import {FC} from "react";

const AddingMenu: FC<{ onAdding: (type: string) => void}> = ({onAdding}) => {
    const items: MenuProps['items'] = [
        {
            key: 'weather',
            label: (
                <div onClick={() => {
                    onAdding('weather');
                }}>
                    Погода
                </div>
            ),
        },
        {
            key: 'clocks',
            label: (
                <div onClick={() => {
                    onAdding('clocks');
                }}>
                    Часы
                </div>
            ),
        },
        {
            key: 'currency',
            label: (
                <div onClick={() => {
                    onAdding('currency');
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