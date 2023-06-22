import { calculateWinner } from "../util/calculateWinner";
import Square from "./Square";

function Board({
    xIsNext,
    squares,
    onPlay,
}: {
    xIsNext: boolean;
    squares: Array<string | null>;
    onPlay: (squares: Array<string | null>) => void;
}) {
    function handleClick(i: number) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
        <>
            <h1>Tic Tac Toe</h1>
            <div className="status">{status}</div>
            <div className="square-wrapper">
                {squares.map((_, i) => (
                    <Square
                        winner={winner}
                        value={squares[i]}
                        onSquareClick={() => handleClick(i)}
                        key={`sq-${i}`}
                    />
                ))}
            </div>
        </>
    );
}

export default Board;
