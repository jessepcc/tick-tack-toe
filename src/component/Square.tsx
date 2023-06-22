function Square({
    winner,
    value,
    onSquareClick,
    id,
}: {
    winner: string | null;
    value: string | null;
    onSquareClick: () => void;
    id: string;
}) {
    return (
        <button
            className="square"
            onClick={onSquareClick}
            disabled={value !== null || winner !== null}
            id={id}
        >
            {value}
        </button>
    );
}

export default Square;
