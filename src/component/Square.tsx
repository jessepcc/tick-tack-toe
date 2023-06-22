function Square({
    winner,
    value,
    onSquareClick,
}: {
    winner: string | null;
    value: string | null;
    onSquareClick: () => void;
}) {
    return (
        <button
            className="square"
            onClick={onSquareClick}
            disabled={value !== null || winner !== null}
        >
            {value}
        </button>
    );
}

export default Square;
