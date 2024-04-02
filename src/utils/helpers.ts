import React from "react";

import type { Alert } from "react-native"

import type { GameActions, GameState } from "../types";
import { findVictory } from ".";

type ResetGame = (
    setPlayer: React.Dispatch<React.SetStateAction<"playerO" | "playerX">>,
    setLastPlayed: React.Dispatch<React.SetStateAction<[number | null, number | null]>>,
    setVictory: React.Dispatch<React.SetStateAction<boolean>>,
    dispatch: React.Dispatch<GameActions>,
) => void

export const resetGame: ResetGame = (setPlayer, setLastPlayed, setVictory, dispatch): void => {

    setPlayer("playerO");
    setLastPlayed([null, null]);
    setVictory(false);
    dispatch({ type: "reset" });
}

type HandleEnd = (
    lastPlayed: [number | null, number | null],
    victory: boolean,
    setVictory: React.Dispatch<React.SetStateAction<boolean>>,
    gameState: GameState,
    dispatch: React.Dispatch<GameActions>,
    alert: typeof Alert.alert
) => void

export const handleEnd: HandleEnd = ([lRow, lCol], victory, setVictory, gameState, dispatch, alert): void => {

    if (lRow === null || lCol === null) return

        console.log("called")

    if (!victory) {

        const { player } = gameState[lRow][lCol];

        const victoryCells = findVictory(3, lRow, lCol, (row, col) => gameState[row][col].player !== player);

        console.log(victoryCells)

        if (victoryCells) {
            setVictory(true);
            dispatch({ type: "victory", indices: victoryCells});
            alert("Player " + player?.replace("player", "") + " won", "Swipe left to reset");
        }
        else if (gameState.flat().every(({ player }) => player !== undefined)) {
            alert("Game tie", "Swipe left to reset");
        }
    }
}

type HandlePlay = (
    player: "playerO" | "playerX",
    index: [number, number],
    setPlayer: React.Dispatch<React.SetStateAction<"playerO" | "playerX">>,
    setLastPlayed: React.Dispatch<React.SetStateAction<[number | null, number | null]>>,
    dispatch: React.Dispatch<GameActions>,
) => void

export const handlePlay: HandlePlay = (player, index, setPlayer, setLastPlayed, dispatch): void => {

    dispatch({ type: "play", index, player });
    setPlayer(player === "playerO" ? "playerX" : "playerO");
    setLastPlayed(index);
}