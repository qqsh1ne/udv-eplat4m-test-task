import cls from './ExchangeWidget.module.scss';
import {FC, useEffect, useState} from "react";
import {Radio, Select} from "antd";
import {ITypedWidgetProps} from "../../../types/IWidgetProps.ts";
import ArrowDown from '../../../assets/arrow-down.svg';
import ArrowUp from '../../../assets/arrow-up.svg';

interface ICurrency {
    ID: string,
    NumCode: string,
    CharCode: string,
    Nominal: number,
    Name: string,
    Value: number,
    Previous: number,
}

interface ICurrencyListItem {
    [key: string]: ICurrency
}

interface ICurrencyPrices {
    curr: number,
    prev: number,
}

const URL = 'https://www.cbr-xml-daily.ru/daily_json.js';

const ExchangeWidget: FC<ITypedWidgetProps> = ({settings, onSettingsChange}) => {
    const [isError, setIsError] = useState<boolean>(false);
    const [currencyList, setCurrencyList] = useState<ICurrencyListItem>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [mode, setMode] = useState<string>(settings.mode);
    const [currencyPrices, setCurrencyPrices] = useState<ICurrencyPrices>({curr: 0, prev: 0});
    const [secondCurrencyPrices, setSecondCurrencyPrices] = useState<ICurrencyPrices>({curr: 0, prev: 0});

    useEffect(() => {
        fetch(URL)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                setCurrencyList(response.Valute);
            })
            .catch((error) => {
                console.error(error);
                setIsError(true);
            });
    }, []);

    useEffect(() => {
        if (Object.keys(currencyList).length === 0) {
            return
        }
        setCurrencyPrices(getPrices(settings.currency));
        setSecondCurrencyPrices(getPrices(settings.secondCurrency));
        setIsLoading(false);
    }, [currencyList]);

    const getPrices = (currency: string): ICurrencyPrices => {
        return {
            curr: currencyList[currency].Value / currencyList[currency]!.Nominal,
            prev: currencyList[currency].Previous / currencyList[currency]!.Nominal,
        }
    }

    return (
        <div className={cls.widget}>
            {isLoading && !isError && <div className={cls.infoBlock}>Loading...</div>}
            {isError && <div className={cls.infoBlock}>Произошла ошибка :(</div>}
            {!isLoading && !isError &&
                <div className={cls.innerWrapper}>
                    {mode === 'ruble' &&
                        <>
                            <div className={cls.infoBlock}>
                                <Select
                                    className={cls.currency}
                                    options={Array.from(Object.keys(currencyList), (key) => ({value: key, label: key}))}
                                    value={settings.currency}
                                    onChange={(value) => {
                                        settings.currency = value;
                                        setCurrencyPrices(getPrices(settings.currency));
                                        onSettingsChange(settings);
                                    }}
                                />
                                <p>{currencyList[settings.currency].Name}</p>
                            </div>
                            <div className={cls.infoBlock}>
                                <p>Курс к рублю</p>
                                <p className={cls.price}>
                                    <img
                                        src={currencyPrices.curr > currencyPrices.prev ? ArrowUp : ArrowDown}
                                        width={24} alt="Отображение динамики"
                                    />
                                    {currencyPrices.curr.toFixed(3)}
                                </p>
                            </div>
                            <div className={cls.infoBlock}>
                                <p>Предыдущий</p>
                                <p>{currencyPrices.prev.toFixed(3)}</p>
                            </div>
                        </>
                    }
                    {mode === 'custom' &&
                        <>
                            <div className={cls.infoBlock}>
                                <Select
                                    className={cls.currency}
                                    options={Array.from(Object.keys(currencyList), (key) => ({value: key, label: key}))}
                                    value={settings.currency}
                                    onChange={(value) => {
                                        settings.currency = value;
                                        setCurrencyPrices(getPrices(settings.currency));
                                        onSettingsChange(settings)
                                    }}
                                />
                                <p className={cls.name}>{currencyList[settings.currency].Name}</p>
                            </div>
                            <div className={cls.infoBlock}>
                                <Select
                                    className={cls.currency}
                                    options={Array.from(Object.keys(currencyList), (key) => ({value: key, label: key}))}
                                    value={settings.secondCurrency}
                                    onChange={(value) => {
                                        settings.secondCurrency = value;
                                        setSecondCurrencyPrices(getPrices(settings.secondCurrency));
                                        onSettingsChange(settings)
                                    }}
                                />
                                <p className={cls.name}>{currencyList[settings.secondCurrency].Name}</p>
                            </div>
                            <div className={cls.infoBlock}>
                                <p>Текущее</p>
                                <p className={cls.price}>
                                    <img
                                        src={
                                        currencyPrices.curr / secondCurrencyPrices.curr
                                        > currencyPrices.prev / secondCurrencyPrices.prev
                                            ? ArrowUp
                                            : ArrowDown}
                                        width={24} alt="Отображение динамики"
                                    />
                                    <span>{(currencyPrices.curr / secondCurrencyPrices.curr).toFixed(3)}</span>
                                </p>
                            </div>
                            <div className={cls.infoBlock}>
                                <p>Прошлое</p>
                                <p>{(currencyPrices.prev / secondCurrencyPrices.prev).toFixed(3)}</p>
                            </div>
                        </>
                    }
                    <div className={cls.footer}>
                        <Radio.Group
                            className={cls.modeSelector}
                            value={mode}
                            onChange={(evt) => {
                                settings.mode = evt.target.value;
                                setMode(evt.target.value);
                                onSettingsChange(settings);
                            }}
                        >
                            <Radio.Button value={'ruble'}>К рублю</Radio.Button>
                            <Radio.Button value={'custom'}>Пара</Radio.Button>
                        </Radio.Group>
                    </div>
                </div>
            }
        </div>
    )
}

export default ExchangeWidget;