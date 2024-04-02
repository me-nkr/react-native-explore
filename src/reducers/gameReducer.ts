import { GameActions, GameState } from "../types"

export default (state: GameState, action: GameActions): GameState => {

    switch (action.type) {
        case "play":
            const { player, index: [row, col] } = action;
            state[row][col] = { ...state[row][col], player, disabled: true }
            return [...state];
        case "reset":
            for (let [r, row] of state.entries()) {
                for (let [c, col] of row.entries()) {
                    state[r][c] = {}
                }
            }
            return [...state];
        case "victory":
            for (let [r, row] of state.entries()) {
                for (let [c, col] of row.entries()) {
                    state[r][c] = { ...col, disabled: true }
                }
            }

            for (let [row, col] of action.indices) {
                if ("player" in state[row][col] && state[row][col].disabled === true) {
                    state[row][col] = { ...state[row][col], winState: true }
                }
            }
            return [...state];
    }
}