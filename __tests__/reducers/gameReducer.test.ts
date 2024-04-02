/**
 * @format
 */

import { describe, it, expect } from '@jest/globals';

import type { GameState } from '../../src/types';
import { gameReducer } from '../../src/reducers';

describe("Game State Reducer", () => {

    describe("reset action", () => {

        it("should reset all cells to empty", () => {

            const testGameState: GameState = [
                [{ player: "playerO", disabled: true, winState: true }, { player: "playerX", disabled: true }, {}],
                [{}, { player: "playerO", disabled: true, winState: true }, {}],
                [{ player: "playerX", disabled: true }, {}, { player: "playerO", disabled: true, winState: true }]
            ]

            const result: GameState = [
                [{}, {}, {}],
                [{}, {}, {}],
                [{}, {}, {}]
            ]

            const sample = gameReducer(testGameState, { type: "reset" });

            expect(sample).toEqual(result)
        });
    })

    describe("play action", () => {

        it("should change cell to player and disable it", () => {

            const testGameState: GameState = [
                [{ player: "playerO", disabled: true }, { player: "playerX", disabled: true }, {}],
                [{}, { player: "playerO", disabled: true }, {}],
                [{ player: "playerX", disabled: true }, {}, { player: "playerX", disabled: true }]
            ]

            const result: GameState = [
                [{ player: "playerO", disabled: true }, { player: "playerX", disabled: true }, {}],
                [{ player: "playerX", disabled: true }, { player: "playerO", disabled: true }, {}],
                [{ player: "playerX", disabled: true }, {}, { player: "playerX", disabled: true }]
            ]

            const sample = gameReducer(testGameState, { type: "play", index: [1, 0], player: "playerX" });

            expect(sample).toEqual(result)
        });
    })

    describe("victory action", () => {

        it("should disable all cells and hightlight victorious cells", () => {

            const testGameState: GameState = [
                [{ player: "playerO", disabled: true }, { player: "playerX", disabled: true }, {}],
                [{}, { player: "playerO", disabled: true }, {}],
                [{ player: "playerX", disabled: true }, {}, { player: "playerO", disabled: true }]
            ]

            const result: GameState = [
                [{ player: "playerO", disabled: true, winState: true }, { player: "playerX", disabled: true }, { disabled: true }],
                [{ disabled: true }, { player: "playerO", disabled: true, winState: true }, { disabled: true }],
                [{ player: "playerX", disabled: true }, { disabled: true }, { player: "playerO", disabled: true, winState: true }]
            ]

            const sample = gameReducer(testGameState, { type: "victory", indices: [[0, 0], [1, 1], [2, 2]] })

            expect(sample).toEqual(result);
        })
    });

})
