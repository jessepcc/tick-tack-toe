import { useState, useEffect, useCallback } from "react";
import Board from "./component/Board";
import "./App.css";
import PastGame from "./component/PastGame";
import SetAuto from "./component/SetAuto";
import { calculateWinner } from "./util/calculateWinner";

function App() {
    const [auto, setAuto] = useState(true);
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

    // random move base on the current game
    const autoPlay = useCallback(
        (currentGame: Array<Array<string | null>>) => {
            // find all empty squares
            const emptySquares = currentGame[currentMove].reduce(
                (acc, cur, i) => (cur === null ? [...acc, i] : acc),
                [] as Array<number>
            );
            // pick a random empty square
            const randomSquare =
                emptySquares[Math.floor(Math.random() * emptySquares.length)];
            // make a move
            const nextSquares = currentGame[currentMove].slice();
            nextSquares[randomSquare] = xIsNext ? "X" : "O";

            const nextGame = [
                ...currentGame.slice(0, currentMove + 1),
                nextSquares,
            ];
            setGame(nextGame);
            setCurrentMove(nextGame.length - 1);
        },
        [currentMove, setGame, setCurrentMove, xIsNext]
    );

    function handlePlay(nextSquares: Array<string | null>) {
        const nextGame = [...game.slice(0, currentMove + 1), nextSquares];
        setGame(nextGame);
        setCurrentMove(nextGame.length - 1);
    }

    function handleReset() {
        setGame([Array(9).fill(null)]);
        setCurrentMove(0);
        setMode("play");
    }

    useEffect(() => {
        // save the game and currentMove to localStorage
        localStorage.setItem("game", JSON.stringify(game));
        localStorage.setItem("currentMove", JSON.stringify(currentMove));

        if (auto && mode === "play" && !xIsNext) {
            autoPlay(game);
        }

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
    }, [mode, game, currentMove, currentSquares, auto, xIsNext, autoPlay]);

    if (!currentSquares) {
        return <div>Invalid</div>;
    }

    return (
        <div className="game">
            <h1>Tic Tac Toe</h1>
            <div className="game-board">
                <Board
                    xIsNext={xIsNext}
                    squares={currentSquares}
                    onPlay={handlePlay}
                />
            </div>
            <div>
                <SetAuto
                    started={currentMove !== 0 || mode === "view"}
                    isAuto={auto}
                    setAuto={setAuto}
                />
                <button id="reset" onClick={handleReset}>
                    reset
                </button>
            </div>
            <PastGame
                setGame={setGame}
                setCurrentMove={setCurrentMove}
                setMode={setMode}
            />
        </div>
    );
}

export default App;
