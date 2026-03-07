import { useState, useEffect } from 'react';
import { fetchCurrencies, convertCurrency } from './currencyApi';

export function useCurrencyConverter() {
    const [currencies, setCurrencies] = useState<string[]>([]);
    const [currencyOne, setCurrencyOne] = useState({ code: 'USD', amount: 0, prevAmount: 0 });
    const [currencyTwo, setCurrencyTwo] = useState({ code: 'EUR', amount: 0, prevAmount: 0 });
    const [fromSide, setFromSide] = useState<1 | 2>(1);
    const [isLoading, setIsLoading] = useState(false);

    const exchangeCurrencies = () => {
        const temp = currencyOne.code;
        setFromSide(1)
        setCurrencyOne(prev => ({ ...prev, code: currencyTwo.code, prevAmount: currencyOne.amount + 1 }));
        setCurrencyTwo(prev => ({ ...prev, code: temp }));
    };

    useEffect(() => {
        fetchCurrencies().then(setCurrencies).catch(console.error);
    }, []);

    useEffect(() => {
        const performConversion = async () => {
            if (fromSide === 1) {
                if (currencyOne.amount === currencyOne.prevAmount) return;
                setCurrencyOne(prev => ({ ...prev, prevAmount: currencyOne.amount }));
            } else {
                if (currencyTwo.amount === currencyTwo.prevAmount) return;
                setCurrencyTwo(prev => ({ ...prev, prevAmount: currencyTwo.amount }));
            }
            setIsLoading(true);
            try {
                if (fromSide === 1) {
                    const result = await convertCurrency(currencyOne.code, currencyTwo.code, currencyOne.amount);
                    setCurrencyTwo(prev => ({ ...prev, amount: Number(result), prevAmount: currencyTwo.amount }));
                } else {
                    const result = await convertCurrency(currencyTwo.code, currencyOne.code, currencyTwo.amount);
                    setCurrencyOne(prev => ({ ...prev, amount: Number(result), prevAmount: currencyOne.amount }));
                }
            } finally {
                setIsLoading(false);
            }
        };

        const timer = setTimeout(performConversion, 500);
        return () => clearTimeout(timer);
    }, [currencyOne.amount, currencyOne.code, currencyTwo.amount, currencyTwo.code, fromSide]);

    return {
        currencies,
        currencyOne, setCurrencyOne,
        currencyTwo, setCurrencyTwo,
        setFromSide, fromSide,
        exchangeCurrencies, isLoading
    };
}