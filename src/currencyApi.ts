const BASE_URL = 'https://open.er-api.com/v6/latest';
const error = 'Something went wrong, please try again later or contact the developer @Tunwell1 on github';

export async function fetchCurrencies(setError: (error: string) => void) {
    try {
        const resp = await fetch(`${BASE_URL}/USD`);
        const data = await resp.json();
        return Object.keys(data.rates);
    } catch (e) {
        console.log(e)
        if (e instanceof Error) setError(e.message+'. '+error);
        else setError(error);
        return [];
    }
}

export async function convertCurrency(setError: (error: string) => void, from: string, to: string, amount: number) {
    try {
        const resp = await fetch(`${BASE_URL}/${from}`);
        const data = await resp.json();
        return (amount * data.rates[to]).toFixed(2);
    } catch (e) {
        console.log(e)
        if (e instanceof Error) setError(e.message+'. '+error);
        else setError(error);
        return 0;
    }
}