import ReactCountryFlag from 'react-country-flag';
import countryCodes from '../../countries.json';
import './style.css';

interface Props {
    amount: number | string;
    code: string;
    currencies: string[];
    excludedCode: string;
    onAmountChange: (val: number) => void;
    onCodeChange: (val: string) => void;
}

export const CurrencyInput = ({ amount, code, currencies, excludedCode, onAmountChange, onCodeChange }: Props) => (
    <div className="currency-row">
        <ReactCountryFlag
            countryCode={countryCodes[code as keyof typeof countryCodes]}
            svg
            className='flag'
        />
        <select value={code} onChange={(e) => onCodeChange(e.target.value)}>
            {currencies
                .filter(c => c !== excludedCode)
                .map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input
            type="number"
            value={typeof amount === 'number' ? parseFloat(amount.toFixed(2))+'' : amount}
            onChange={(e) => onAmountChange(Number(e.target.value))}
        />
    </div>
);