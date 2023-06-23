import { describe, it, assert } from "vitest";
import { calculateWinner } from "./calculateWinner";

describe("calculateWinner", () => {
    it("X wins", () => {
        assert.equal(
            calculateWinner(["X", "O", "X", "O", "X", "O", "X", "O", "X"]),
            "X"
        );
    });

    it("No one win", () => {
        assert.equal(
            calculateWinner([
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
            ]),
            null
        );

        assert.equal(
            calculateWinner([null, "O", "X", "O", "X", "O", null, "O", "X"]),
            null
        );
    });
});
