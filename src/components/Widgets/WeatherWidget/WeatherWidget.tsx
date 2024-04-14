import cls from './WeatherWidget.module.scss';
import {Select} from "antd";
import {FC, useEffect, useState} from "react";
import {capitalize} from "../../../util.ts";
import {CITIES} from "../../../consts.ts";
import {ITypedWidgetProps} from "../../../types/IWidgetProps.ts";

interface IForecast {
    [key: string]: number | string;
}

const WeatherWidget: FC<ITypedWidgetProps> = ({settings, onSettingsChange}) => {
    const [forecast, setForecast] = useState<IForecast>({});
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${settings.city}&appid=0f94c65b4ad8121485654ca9df7d9709&lang=ru&units=metric`;

        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                setForecast({...response.main, wind: response.wind.speed, clouds: response.clouds.all, description: response.weather[0].description});
                setIsError(false);
            })
            .catch((error) => {
                console.error(error);
                setIsError(true);
            });
    }, [settings.city]);

    return (
        <div className={cls.widget}>
                <div className={cls.innerWrapper}>
                    <Select
                        className={cls.city}
                        options={CITIES}
                        value={settings.city}
                        onChange={(value) => {
                            settings.city = value;
                            onSettingsChange(settings)
                        }}
                    />
                    {isError && <div className={cls.infoBlock}>Произошла ошибка :(</div>}
                    {!isError &&
                        <>
                            <div className={cls.temperature}>
                                <p>{forecast.temp ? Math.round(forecast.temp as number) : 0}°</p>
                                <div className={cls.temperatureRange}>
                                    <p>↑{forecast.temp_max ? Math.ceil(forecast.temp_max as number) : 0}°</p>
                                    <p>↓{forecast.temp_min ? Math.floor(forecast.temp_min as number) : 0}°</p>
                                </div>
                            </div>
                            <div className={cls.infoBlock}>
                                <p>Влажность</p>
                                <p>{forecast.humidity ? forecast.humidity : 0}%</p>
                            </div>
                            <div className={cls.infoBlock}>
                                <p>Ветер</p>
                                <p>{forecast.wind ? forecast.wind : 0} м/с</p>
                            </div>
                            <div className={cls.infoBlock}>
                                <p>Ощущается как</p>
                                <p>{forecast.feels_like ? Math.round(forecast.feels_like as number) : 0}°</p>
                            </div>
                            <div className={cls.infoBlock}>
                                <p>Облачность</p>
                                <p>{forecast.clouds ? forecast.clouds : 0}%</p>
                            </div>
                            <div className={cls.infoBlock}>
                                {forecast.description ? capitalize(forecast.description as string) : ''}
                            </div>
                        </>
                    }
                </div>
        </div>
    )
};

export default WeatherWidget;