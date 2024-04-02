/**
 * @format
 */

import React from "react";
import { describe, it, expect, jest } from '@jest/globals';

import { Alert } from "react-native";

import { resetGame, handleEnd, handlePlay } from '../../src/utils';
import { GameActions, GameState } from "../../src/types";

describe("Reset Game", () => {
    it("should dispatch reset and reset player, lastPlayed and victory", () => {
        const setPlayer = jest.fn<React.Dispatch<React.SetStateAction<"playerO" | "playerX">>>();
        const setVictory = jest.fn<React.Dispatch<React.SetStateAction<boolean>>>();
        const setLastPlayed = jest.fn<React.Dispatch<React.SetStateAction<[number | null, number | null]>>>();
        const dispatch = jest.fn<React.DispatchWithoutAction>();

        resetGame(setPlayer, setLastPlayed, setVictory, dispatch);

        expect(setPlayer).toBeCalledWith("playerO");
        expect(setVictory).toBeCalledWith(false);
        expect(setLastPlayed).toBeCalledWith([null, null]);
        expect(dispatch).toBeCalledWith(
            expect.objectContaining({
                type: "reset"
            })
        )
    });
})

describe("Handle End of Game", () => {

    describe("victory", () => {

        it("should dipatch, set and announce victory", () => {
            const testGameState: GameState = [
                [{ player: "playerO", disabled: true }, {}, { player: "playerO", disabled: true }],
                [{ player: "playerX", disabled: true }, { player: "playerO", disabled: true }, { player: "playerX", disabled: true }],
                [{ player: "playerX", disabled: true }, { player: "playerO", disabled: true }, { player: "playerO", disabled: true }]
            ]
            const setVictory = jest.fn<React.Dispatch<React.SetStateAction<boolean>>>();
            const dispatch = jest.fn<React.DispatchWithoutAction>();
            const alert = jest.fn<typeof Alert.alert>();

            handleEnd([0, 0], false, setVictory, testGameState, dispatch, alert);

            expect(setVictory).toBeCalledWith(true);
            expect(dispatch).toBeCalledWith(
                expect.objectContaining({
                    type: "victory",
                    indices: [[0, 0], [1, 1], [2, 2]]
                })
            )
            expect(alert).toBeCalledWith("Player O won", "Swipe left to reset");

        });

        it("should do nothing on already acted on victory", () => {
            const testGameState: GameState = [
                [{ player: "playerO", disabled: true, winState: true }, {}, { player: "playerO", disabled: true }],
                [{ player: "playerX", disabled: true }, { player: "playerO", disabled: true, winState: true }, { player: "playerX", disabled: true }],
                [{ player: "playerX", disabled: true }, { player: "playerO", disabled: true }, { player: "playerO", disabled: true, winState: true }]
            ]
            const setVictory = jest.fn<React.Dispatch<React.SetStateAction<boolean>>>();
            const dispatch = jest.fn<React.Dispatch<GameActions>>();
            const alert = jest.fn<typeof Alert.alert>();

            handleEnd([2, 2], true, setVictory, testGameState, dispatch, alert);

            expect(setVictory).not.toBeCalled();
            expect(dispatch).not.toBeCalled();
            expect(alert).not.toBeCalled();

        });

        it("should do nothing in beginning", () => {
            const testGameState: GameState = [
                [{}, {}, {}],
                [{}, {}, {}],
                [{}, {}, {}],
            ]
            const setVictory = jest.fn<React.Dispatch<React.SetStateAction<boolean>>>();
            const dispatch = jest.fn<React.Dispatch<GameActions>>();
            const alert = jest.fn<typeof Alert.alert>();

            handleEnd([null, null], false, setVictory, testGameState, dispatch, alert);

            expect(setVictory).not.toBeCalled();
            expect(dispatch).not.toBeCalled();
            expect(alert).not.toBeCalled();

        })
    })
    describe("tie", () => {
        it("should announce tie", () => {
            const testGameState: GameState = [
                [{ player: "playerO", disabled: true }, { player: "playerX", disabled: true }, { player: "playerO", disabled: true }],
                [{ player: "playerX", disabled: true }, { player: "playerO", disabled: true }, { player: "playerX", disabled: true }],
                [{ player: "playerX", disabled: true }, { player: "playerO", disabled: true }, { player: "playerX", disabled: true }]
            ]
            const setVictory = jest.fn<React.Dispatch<React.SetStateAction<boolean>>>();
            const dispatch = jest.fn<React.Dispatch<GameActions>>();
            const alert = jest.fn<typeof Alert.alert>();

            handleEnd([2, 2], false, setVictory, testGameState, dispatch, alert);

            expect(setVictory).not.toBeCalled();
            expect(dispatch).not.toBeCalled();
            expect(alert).toBeCalledWith("Game tie", "Swipe left to reset");

        });
    })
})

describe("Handle Game Play", () => {
    it("should switch player and update the game", () => {

        const testGameState: GameState = [
            [{ player: "playerO", disabled: true }, { player: "playerX", disabled: true }, { player: "playerO", disabled: true }],
            [{ player: "playerX", disabled: true }, { player: "playerO", disabled: true }, { player: "playerX", disabled: true }],
            [{ player: "playerX", disabled: true }, { player: "playerO", disabled: true }, {}]
        ]
        const setPlayer = jest.fn<React.Dispatch<React.SetStateAction<"playerX" | "playerO">>>();
        const setLastPlayed = jest.fn<React.Dispatch<React.SetStateAction<[number | null, number | null]>>>();
        const dispatch = jest.fn<React.DispatchWithoutAction>();

        handlePlay("playerO", [2, 2], setPlayer, setLastPlayed, dispatch);

        expect(setPlayer).toBeCalledWith("playerX");
        expect(setLastPlayed).toBeCalledWith([2, 2])
        expect(dispatch).toBeCalledWith(
            expect.objectContaining({
                type: "play",
                player: "playerO",
                index: [2, 2]
            })
        )

    });
})