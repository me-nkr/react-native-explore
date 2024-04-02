import React from "react";
import { TouchableNativeFeedback, View, ViewStyle, StyleSheet } from "react-native";

import { PieceO, PieceX } from "./Piece";

interface CellProps {
    index: [number, number];
    player?: "playerX" | "playerO" | undefined;
    disabled?: boolean | undefined;
    pressHandler: (row: number, col: number) => void;
    borders?: {
        top?: boolean;
        bottom?: boolean;
        left?: boolean;
        right?: boolean;
    }
    winState?: boolean | undefined;
}

const Cell: React.FC<CellProps> = ({ index: [row, col], player, disabled, pressHandler, borders, winState }) => {

  const bordersStyle: ViewStyle = {};

  borders && borders.top ? bordersStyle.borderTopWidth = 2 : bordersStyle.borderTopWidth = 0;
  borders && borders.left ? bordersStyle.borderLeftWidth = 2 : bordersStyle.borderLeftWidth = 0;
  borders && borders.right ? bordersStyle.borderRightWidth = 2 : bordersStyle.borderRightWidth = 0;
  borders && borders.bottom ? bordersStyle.borderBottomWidth = 2 :bordersStyle.borderBottomWidth = 0 ;

  return (
    <TouchableNativeFeedback
      disabled={disabled}
      onPress={() => pressHandler(row, col)}
      accessibilityLabel={`cell ${row} ${col}`}
    >
      <View
        style={[styles.cell, bordersStyle]}
      >
        {
          player === "playerX" ? (<PieceX winState={winState} />) :
          player === "playerO" ? (<PieceO winState={winState} />) :
          ""
        }
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
    cell: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default Cell;