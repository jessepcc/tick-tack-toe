import { useState, useEffect } from "react";
import Board from "./component/Board";
import "./App.css";
import PastGame from "./component/PastGame";
import { calculateWinner } from "./util/calculateWinner";

function App() {
    const [mode, setMode] = useState<"play" | "view">("play");
    const [game, setGame] = useState<Array<Array<string | null>>>(() => {
        const currentGame = localStorage.getItem("game");
        if (currentGame && JSON.parse(currentGame).length > 0) {
            return JSON.parse(currentGame);
        }
        return [Array(9).fill(null)];
    });
    const [currentMove, setCurrentMove] = useState(() => {
        const localCurrentMove = localStorage.getItem("currentMove");
        if (localCurrentMove && +localCurrentMove >= 0) {
            return +localCurrentMove;
        }
        return 0;
    });

    const xIsNext = currentMove % 2 === 0;
    const currentSquares = game[currentMove];

    function handlePlay(nextSquares: Array<string | null>) {
        const nextGame = [...game.slice(0, currentMove + 1), nextSquares];
        setGame(nextGame);
        setCurrentMove(nextGame.length - 1);
    }

    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove);
    }

    function handleReset() {
        setGame([Array(9).fill(null)]);
        setCurrentMove(0);
        setMode("play");
    }

    const movesList = game.map((_, move) => {
        let description;
        if (move > 0) {
            description = "Go to move #" + move;
        } else {
            description = "Go to game start";
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    useEffect(() => {
        // save the game and currentMove to localStorage
        localStorage.setItem("game", JSON.stringify(game));
        localStorage.setItem("currentMove", JSON.stringify(currentMove));

        // save the game to history when it's over
        if (
            mode === "play" &&
            currentSquares &&
            calculateWinner(currentSquares)
        ) {
            const _history = localStorage.getItem("history");
            const history = _history ? JSON.parse(_history) : [];
            // only save most recent 10 games
            if (history.length >= 10) {
                history.shift();
                history.push(game);
            } else {
                history.push(game);
            }
            localStorage.setItem("history", JSON.stringify(history));
        }
    }, [mode, game, currentMove, currentSquares]);

    if (!currentSquares) {
        return <div>sad</div>;
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    xIsNext={xIsNext}
                    squares={currentSquares}
                    onPlay={handlePlay}
                />
            </div>
            {/* <div className="game-info">
                <ol>{movesList}</ol>
            </div> */}

            <button onClick={handleReset}>reset</button>
            <PastGame
                setGame={setGame}
                setCurrentMove={setCurrentMove}
                setMode={setMode}
            />
        </div>
    );
}

export default App;
