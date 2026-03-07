const BASE_URL = 'https://open.er-api.com/v6/latest';

export async function fetchCurrencies() {
    const resp = await fetch(`${BASE_URL}/USD`);
    const data = await resp.json();
    return Object.keys(data.rates);
}

export async function convertCurrency(from: string, to: string, amount: number) {
    const resp = await fetch(`${BASE_URL}/${from}`);
    const data = await resp.json();
    return (amount * data.rates[to]).toFixed(2);
}