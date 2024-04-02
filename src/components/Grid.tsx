import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";

import type { GameState } from "../types";
import Cell from "./Cell";

interface GridProps {
    borders?: boolean;
    cellPressHandler: (row: number, col: number) => void;
    gameState: GameState;
}

const Grid: React.FC<GridProps> = ({ borders = false, cellPressHandler, gameState }) => {

    const { height, width } = useWindowDimensions();

    const size = gameState.length;

    const grid = [];

    for (let row = 0; row < size; row++) {

        const gridRow = [];

        for (let col = 0; col < size; col++)

            gridRow.push(
                <Cell
                    key={`cell ${row} ${col}`}
                    index={[row, col]}
                    borders={getBorders(borders, size, row, col)}
                    pressHandler={cellPressHandler}
                    {...gameState[row][col]}
                />
            )

        grid.push(
            <View
                key={`row ${row}`}
                style={{ flex: 1, flexDirection: "row" }}
                accessible={true}
                accessibilityLabel={`row ${row}`}
            >
                {gridRow}
            </View>
        )
    }

    const gridStyle = StyleSheet.create({

        dimension: {
            height: width < height ? width * 0.9 : height * 0.9,
            width: width < height ? width * 0.9 : height * 0.9,
        }

    })

    return (
        <View
            accessible={true}
            accessibilityLabel="tic tac toe grid"
            style={gridStyle.dimension}
        >{grid}</View>
    );

}

const getBorders = (borders: boolean, size: number, row: number, col: number): {
    top: boolean, left: boolean, right: boolean, bottom: boolean
} => {

    const result = {
        top: true,
        left: true,
        right: true,
        bottom: true
    }

    if (borders) return result;

    if (row === 0) result.top = false;
    if (row === size - 1) result.bottom = false;
    if (col === 0) result.left = false;
    if (col === size - 1) result.right = false;

    return result;
}

export default Grid;