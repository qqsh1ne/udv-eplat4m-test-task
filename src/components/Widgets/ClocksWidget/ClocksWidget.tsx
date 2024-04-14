import {FC, useEffect, useState} from "react";
import cls from './ClocksWidget.module.scss';
import {allTimezones, useTimezoneSelect} from "react-timezone-select";
import {Select} from "antd";
import {ITypedWidgetProps} from "../../../types/IWidgetProps.ts";

const labelStyle = 'original';
const timezones = {
    ...allTimezones,
};

const getTimeWithTimezone = (date: Date, timezone: string): string => {
    return new Intl.DateTimeFormat('ru-RU', {
        timeZone: timezone,
        timeStyle: 'medium',
    }).format(date);
};

const getDateWithTimezone = (date: Date, timezone: string): string => {
    return new Intl.DateTimeFormat('ru-RU', {
        timeZone: timezone,
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
    }).format(date);
};

const ClocksWidget: FC<ITypedWidgetProps> = ({settings, onSettingsChange}) => {
    const [time, setTime] = useState<string>(getTimeWithTimezone(new Date(), settings.timezone));
    const [date, setDate] = useState<string>(getDateWithTimezone(new Date(), settings.timezone));

    const {options} = useTimezoneSelect({labelStyle, timezones})

    useEffect(() => {
        const newIntervalId = setInterval(() => {
            setTime(getTimeWithTimezone(new Date(), settings.timezone));
            setDate(getDateWithTimezone(new Date(), settings.timezone));
        }, 1000);

        return () => clearInterval(newIntervalId)
    });

    return (
        <div className={cls.widget}>
            <div className={cls.innerWrapper}>
                <Select
                    options={options}
                    className={cls.timezone}
                    value={settings.timezone}
                    onChange={(value) => {
                        settings.timezone = value;
                        onSettingsChange(settings);
                    }}
                />
                <div className={cls.date}>
                    <div className={cls.dateItem}>
                        <h3>Время</h3>
                        <p>{time}</p>
                    </div>
                    <div className={cls.dateItem}>
                        <h3>Дата</h3>
                        <p>{date}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ClocksWidget;