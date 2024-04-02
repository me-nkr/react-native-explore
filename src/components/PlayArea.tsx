import React from "react";
import { StyleSheet, type GestureResponderEvent, SafeAreaView } from "react-native";

import type { GameState } from "../types";
import Grid from "./Grid";

interface PlayAreaProps {
    swipeHandlers: {
        onTouchStart: (e: GestureResponderEvent) => void;
        onTouchEnd: (e: GestureResponderEvent) => void;
    }
    cellPressHandler: (row: number, col: number) => void;
    gameState: GameState;
}

const PlayArea: React.FC<PlayAreaProps> = ({ swipeHandlers, cellPressHandler, gameState }) => {

    return(
        <SafeAreaView style={styles.playArea} {...swipeHandlers} accessible={true} accessibilityLabel="play area">
            <Grid {...{cellPressHandler, gameState}} />
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    playArea: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default PlayArea;