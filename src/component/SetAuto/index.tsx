import classes from "./index.module.css";

function SetAuto({
    started,
    isAuto,
    setAuto,
}: {
    started: boolean;
    isAuto: boolean;
    setAuto: (isAuto: boolean) => void;
}) {
    return (
        <div className={classes.wrapper}>
            <span className={classes.mode}>❌ vs ⭕️</span>
            <div>
                <input
                    disabled={started}
                    checked={isAuto}
                    onChange={(e) => setAuto(e.target.checked)}
                    className={classes.switch}
                    type="checkbox"
                    id="switch"
                />
                <label htmlFor="switch">Toggle</label>
            </div>
            <span className={classes.mode}>❌ vs 🤖 ⭕️</span>
        </div>
    );
}

export default SetAuto;
