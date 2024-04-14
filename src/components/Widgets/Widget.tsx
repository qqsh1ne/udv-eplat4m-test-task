import {FC} from "react";
import WidgetType from "../../enums/WidgetType.ts";
import ClocksWidget from "./ClocksWidget/ClocksWidget.tsx";
import WeatherWidget from "./WeatherWidget/WeatherWidget.tsx";
import cls from './Widget.module.scss';
import ExchangeWidget from "./ExchangeWidget/ExchangeWidget.tsx";
import {IWidgetProps} from "../../types/IWidgetProps.ts";
import TrashBin from '../../assets/trash-bin.svg';



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
            case WidgetType.Currency:
                return <ExchangeWidget
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
            <button
                className={cls.deleteBtn}
                onClick={() => {
                    onRemove(widget.id)
                }}
            >
                <img src={TrashBin} alt={'Удалить'} width={24}/>
            </button>
        </div>
    )
};

export default Widget;