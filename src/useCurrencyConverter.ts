import { useState, useEffect } from 'react';
import { fetchCurrencies, convertCurrency } from './currencyApi';

export function useCurrencyConverter() {
    const [currencies, setCurrencies] = useState<string[]>([]);
    const [currencyOne, setCurrencyOne] = useState({ code: 'USD', amount: 0 });
    const [currencyTwo, setCurrencyTwo] = useState({ code: 'EUR', amount: 0 });
    const [fromSide, setFromSide] = useState<1 | 2>(1);
    const [error, setError] = useState<string | null>();

    const exchangeCurrencies = () => {
        const temp = currencyOne.code;
        setFromSide(1)
        setCurrencyOne(prev => ({ ...prev, code: currencyTwo.code }));
        setCurrencyTwo(prev => ({ ...prev, code: temp }));
    };

    useEffect(() => {
        fetchCurrencies(setError).then(setCurrencies);
    }, []);

    useEffect(() => {
        const performConversion = async () => {
            if (fromSide === 1) {
                const result = await convertCurrency( setError, currencyOne.code, currencyTwo.code, currencyOne.amount);
                setCurrencyTwo(prev => ({ ...prev, amount: Number(result), prevAmount: currencyTwo.amount }));
            } else {
                const result = await convertCurrency( setError,currencyTwo.code, currencyOne.code, currencyTwo.amount);
                setCurrencyOne(prev => ({ ...prev, amount: Number(result), prevAmount: currencyOne.amount }));
            }
        };

        const timer = setTimeout(performConversion, 500);
        return () => clearTimeout(timer);
    }, [currencyOne.amount, currencyOne.code, currencyTwo.amount, currencyTwo.code, fromSide]);

    return {
        currencies,
        currencyOne, setCurrencyOne,
        currencyTwo, setCurrencyTwo,
        setFromSide, error,
        exchangeCurrencies
    };
}