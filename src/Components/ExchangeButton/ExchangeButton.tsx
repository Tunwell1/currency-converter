import './style.css';

interface Props {
    onClick: () => void;
}

export const ExchangeButton = ({ onClick }: Props) => (
    <button
        className="exchange-button"
        onClick={onClick}
    >
        <img src="https://www.svgrepo.com/show/470812/exchange-vertical.svg" alt="||" />
    </button>
);