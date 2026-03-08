import { useCurrencyConverter } from './useCurrencyConverter'
import { CurrencyInput } from './Components/CurrencyInput/CurrencyInput';
import './App.css';
import { ExchangeButton } from './Components/ExchangeButton/ExchangeButton';

function App() {
  const {
    currencies, currencyOne, setCurrencyOne,
    currencyTwo, setCurrencyTwo, setFromSide,
    exchangeCurrencies, error
  } = useCurrencyConverter();

  return (
    <div className="app-container">
      {error &&
        <div className="error-message">{error}</div>
      }
      <h2>Currency Converter</h2>

      <CurrencyInput
        amount={currencyOne.amount}
        code={currencyOne.code}
        currencies={currencies}
        excludedCode={currencyTwo.code}
        onAmountChange={(val) => { setCurrencyOne(p => ({ ...p, amount: val })); setFromSide(1); }}
        onCodeChange={(val) => setCurrencyOne(p => ({ ...p, code: val }))}
      />

      <ExchangeButton onClick={exchangeCurrencies} />

      <CurrencyInput
        amount={currencyTwo.amount}
        code={currencyTwo.code}
        currencies={currencies}
        excludedCode={currencyOne.code}
        onAmountChange={(val) => { setCurrencyTwo(p => ({ ...p, amount: val })); setFromSide(2); }}
        onCodeChange={(val) => setCurrencyTwo(p => ({ ...p, code: val }))}
      />
    </div>
  );
}

export default App;