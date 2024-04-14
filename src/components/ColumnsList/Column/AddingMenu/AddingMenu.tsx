import {Button, Dropdown, MenuProps} from "antd";
import {FC} from "react";
import WidgetType from "../../../../enums/WidgetType.ts";
import {IWidgetItem} from "../../../../types/IWidgetItem.ts";
import cls from './AddingMenu.module.scss'

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
                    onAdding({type: WidgetType.Clocks, columnId: columnId, settings: {timezone: 'Asia/Yekaterinburg'}});
                }}>
                    Часы
                </div>
            ),
        },
        {
            key: WidgetType.Currency,
            label: (
                <div onClick={() => {
                    onAdding({type: WidgetType.Currency, columnId: columnId, settings: {currency: 'USD', mode: 'ruble', secondCurrency: 'EUR'}});
                }}>
                    Курс валют
                </div>
            ),
        },
    ];

    return (
        <div className={cls.wrapper}>
            <Dropdown menu={{ items }} placement="bottom">
                <Button>Добавить виджет</Button>
            </Dropdown>
        </div>
    )
};

export default AddingMenu;