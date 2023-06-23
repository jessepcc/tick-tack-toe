import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("/");
});

test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(/Tick Tac Toe/);
});

test("has game board", async ({ page }) => {
    await expect(page.getByText("Next player: X")).toBeVisible();
    await expect(page.getByText("Toggle")).toBeVisible();
    await expect(page.getByText("No history")).toBeVisible();
    await expect(page.locator("#square-0")).toBeVisible();
    await expect(page.locator("#square-1")).toBeVisible();
    await expect(page.locator("#square-2")).toBeVisible();
    await expect(page.locator("#square-3")).toBeVisible();
    await expect(page.locator("#square-4")).toBeVisible();
    await expect(page.locator("#square-5")).toBeVisible();
    await expect(page.locator("#square-6")).toBeVisible();
    await expect(page.locator("#square-7")).toBeVisible();
    await expect(page.locator("#square-8")).toBeVisible();
    await expect(page.getByRole("button", { name: /reset/ })).toBeVisible();
});

test("game board at initial state", async ({ page }) => {
    await expect(page.locator("#square-0")).toHaveText("");
    await expect(page.locator("#square-1")).toHaveText("");
    await expect(page.locator("#square-2")).toHaveText("");
    await expect(page.locator("#square-3")).toHaveText("");
    await expect(page.locator("#square-4")).toHaveText("");
    await expect(page.locator("#square-5")).toHaveText("");
    await expect(page.locator("#square-6")).toHaveText("");
    await expect(page.locator("#square-7")).toHaveText("");
    await expect(page.locator("#square-8")).toHaveText("");
    await expect(page.getByText("Next player: X")).toBeVisible();
    await expect(page.getByText("Toggle")).not.toBeChecked();
    await expect(page.getByText("No history")).toBeVisible();
});

test("game board after first move", async ({ page }) => {
    await expect(page.getByText("Next player: X")).toBeVisible();
    await page.locator("#square-0").click();

    await expect(page.locator("#square-0")).toHaveText("X");
    await expect(page.getByText("Next player: O")).toBeVisible();
    await expect(page.locator("#square-0")).toBeDisabled();
    await expect(page.getByText("Toggle")).toBeDisabled();
});

test("game board persist with refresh", async ({ page }) => {
    await expect(page.getByText("Next player: X")).toBeVisible();
    await page.locator("#square-0").click();

    await page.reload();

    await expect(page.locator("#square-0")).toHaveText("X");
    await expect(page.getByText("Next player: O")).toBeVisible();
    await expect(page.locator("#square-0")).toBeDisabled();
    await expect(page.getByText("Toggle")).toBeDisabled();
});

test("game board after a winner", async ({ page }) => {
    // X wins with the first row
    await page.locator("#square-0").click();
    await page.locator("#square-3").click();
    await page.locator("#square-1").click();
    await page.locator("#square-5").click();
    await page.locator("#square-2").click();

    await expect(page.getByText("Winner: X")).toBeVisible();
});

test("game board after a draw", async ({ page }) => {
    // X wins with the first row
    await page.locator("#square-1").click();
    await page.locator("#square-0").click();
    await page.locator("#square-2").click();
    await page.locator("#square-4").click();
    await page.locator("#square-3").click();
    await page.locator("#square-5").click();
    await page.locator("#square-7").click();
    await page.locator("#square-6").click();
    await page.locator("#square-8").click();

    await expect(page.getByText("Draw")).toBeVisible();
});

test("auto mode", async ({ page }) => {
    await page.getByText("Toggle").check();

    await expect(page.getByText("Next player: X")).toBeVisible();
    await page.locator("#square-0").click();
    await expect(page.locator("#square-0")).toHaveText("X");

    const squares = page.getByRole("button").filter({ hasText: "O" });
    await expect(squares).toHaveCount(1);
});

test("reset game", async ({ page }) => {
    await page.locator("#square-0").click();
    await expect(page.getByText("Next player: O")).toBeVisible();

    await page.getByText("Reset").click();
    const squares = page.locator("button[id^=square-]").filter({ hasText: "" });
    await expect(squares).toHaveCount(9);
});

test("show history after game won and start new game", async ({ page }) => {
    // X wins with the first row
    await page.locator("#square-0").click();
    await page.locator("#square-3").click();
    await page.locator("#square-1").click();
    await page.locator("#square-5").click();
    await page.locator("#square-2").click();

    await expect(page.getByText("Winner: X")).toBeVisible();
    await expect(page.getByText("No history")).toBeVisible();
    await page.getByText("Reset").click();
    await expect(page.getByText("View last 10 games")).toBeVisible();
    const history = page.locator("button[id^=past-]");
    await expect(history).toHaveCount(1);
});
