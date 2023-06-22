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
            <button
                id={`past-${10 - i}`}
                key={`game-${i}`}
                onClick={() => handleViewHistory(game)}
            >
                {10 - i}
            </button>
        )
    );

    if (_history.length === 0) {
        return <div>No history</div>;
    }

    return (
        <div>
            <p>View last 10 games</p>
            <div className="history-wrapper">
                <pre>oldest</pre>
                {history}
                <pre>latest</pre>
            </div>
        </div>
    );
}

export default PastGame;
