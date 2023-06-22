function PastGame({
    setGame,
    setCurrentMove,
    setMode,
}: {
    setGame: (game: Array<Array<string | null>>) => void;
    setCurrentMove: (move: number) => void;
    setMode: (mode: "play" | "view") => void;
}) {
    const _history = localStorage.getItem("history")
        ? JSON.parse(localStorage.getItem("history") || "")
        : [];

    function handleViewHistory(history: Array<Array<string | null>>) {
        if (history.length === 0) {
            return;
        }
        setCurrentMove(history.length - 1);
        setGame(history);
        setMode("view");
    }

    const history = _history.map(
        (game: Array<Array<string | null>>, i: number) => (
            <button key={`game-${i}`} onClick={() => handleViewHistory(game)}>
                {i}
            </button>
        )
    );

    return (
        <div>
            <p>Record of last 10 games</p>
            {history}
        </div>
    );
}

export default PastGame;
