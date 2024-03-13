import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  SafeAreaView,
  useWindowDimensions,
  ViewStyle,
  GestureResponderEvent,
  Alert
} from 'react-native';

type CellContent = {
  content: "X" | "O" | "";
  winState: boolean;
}
type GameState = [
  [CellContent, CellContent, CellContent],
  [CellContent, CellContent, CellContent],
  [CellContent, CellContent, CellContent]
];

const App = () => {

  const i: CellContent = { content: "", winState: false }; //initial cell content
  const initialGameState: GameState = [[{ ...i }, { ...i }, { ...i }], [{ ...i }, { ...i }, { ...i }], [{ ...i }, { ...i }, { ...i }]];

  const [player, togglePlayer] = useState<"one" | "two">("one");
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [status, setStatus] = useState<"idle" | "reset" | "complete">("idle");

  const { styles } = useStyle();

  const resetGameState = () => {
    setGameState(initialGameState)
    setStatus("reset");
    togglePlayer("one")
  }

  const { onTouchStart, onTouchEnd } = useSwipe(resetGameState);

  return (
    <SafeAreaView style={styles.main} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <View style={styles.play}>
        <View style={styles.row}>
          <Cell
            index={[0, 0]}
            borderlessSides={["top", "left"]}
            gameState={gameState}
            setGameState={setGameState}
            player={player}
            setPlayer={togglePlayer}
            status={status}
            setStatus={setStatus}
          />
          <Cell
            index={[0, 1]}
            borderlessSides={["top"]}
            gameState={gameState}
            setGameState={setGameState}
            player={player}
            setPlayer={togglePlayer}
            status={status}
            setStatus={setStatus}
          />
          <Cell
            index={[0, 2]}
            borderlessSides={["top", "right"]}
            gameState={gameState}
            setGameState={setGameState}
            player={player}
            setPlayer={togglePlayer}
            status={status}
            setStatus={setStatus}
          />
        </View>
        <View style={styles.row}>
          <Cell
            index={[1, 0]}
            borderlessSides={["left"]}
            gameState={gameState}
            setGameState={setGameState}
            player={player}
            setPlayer={togglePlayer}
            status={status}
            setStatus={setStatus}
          />
          <Cell
            index={[1, 1]}
            gameState={gameState}
            setGameState={setGameState}
            player={player}
            setPlayer={togglePlayer}
            status={status}
            setStatus={setStatus}
          />
          <Cell
            index={[1, 2]}
            borderlessSides={["right"]}
            gameState={gameState}
            setGameState={setGameState}
            player={player}
            setPlayer={togglePlayer}
            status={status}
            setStatus={setStatus}
          />
        </View>
        <View style={styles.row}>
          <Cell
            index={[2, 0]}
            borderlessSides={["bottom", "left"]}
            gameState={gameState}
            setGameState={setGameState}
            player={player}
            setPlayer={togglePlayer}
            status={status}
            setStatus={setStatus}
          />
          <Cell
            index={[2, 1]}
            borderlessSides={["bottom"]}
            gameState={gameState}
            setGameState={setGameState}
            player={player}
            setPlayer={togglePlayer}
            status={status}
            setStatus={setStatus}
          />
          <Cell
            index={[2, 2]}
            borderlessSides={["bottom", "right"]}
            gameState={gameState}
            setGameState={setGameState}
            player={player}
            setPlayer={togglePlayer}
            status={status}
            setStatus={setStatus}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

interface CellProps {
  borderlessSides?: ("top" | "left" | "right" | "bottom")[];
  index: [number, number];
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  player: "one" | "two";
  setPlayer: React.Dispatch<React.SetStateAction<"one" | "two">>;
  status: "idle" | "reset" | "complete";
  setStatus: React.Dispatch<React.SetStateAction<"idle" | "reset" | "complete">>;
}

const Cell = ({ borderlessSides, index, gameState, setGameState, player, setPlayer, status, setStatus }: CellProps) => {

  const [used, setUsed] = useState<boolean>(false);

  const [row, col] = index;

  useEffect(() => {
    if (status === "reset") {
      setUsed(false);
      setStatus("idle");
    }
    if (status === "complete") setUsed(true);
  }, [status])

  const setCellState = ([row, col]: [number, number], content: "X" | "O"): void => {
    const tempState = gameState;
    tempState[row][col].content = content;
    const victory = victoryFinder(tempState.length, row, col, (row, col) => tempState[row][col].content !== content)
    if (victory) {
      for (let [row, col] of victory) {
        tempState[row][col].winState = true;
      }
      setStatus("complete");
      Alert.alert("Player " + player + " won", "Swipe from left to reset")
    }
    else {
      if (tempState.flat().every(({ content }) => content !== ""))
      Alert.alert("Game tie", "Swipe from left to reset");
    }
    setGameState(tempState);
  }

  const handleTurn = () => {
    setUsed(true);

    switch (player) {
      case "one":
        setCellState(index, "O");
        setPlayer("two")
        break;
      case "two":
        setCellState(index, "X");
        setPlayer("one")
        break;
    }
  }

  const { styles } = useStyle();

  const borders: ViewStyle = {};

  if (borderlessSides && borderlessSides.includes("top")) borders.borderTopWidth = 0;
  if (borderlessSides && borderlessSides.includes("left")) borders.borderLeftWidth = 0;
  if (borderlessSides && borderlessSides.includes("right")) borders.borderRightWidth = 0;
  if (borderlessSides && borderlessSides.includes("bottom")) borders.borderBottomWidth = 0;

  return (
    <TouchableNativeFeedback
      disabled={used}
      onPress={handleTurn}
    >
      <View
        style={[styles.cell, borders]}
      >
        <Text
          style={[styles.piece, { color: gameState[row][col].winState ? "#50c878" : "#000" }]}
        >
          {gameState[row][col].content}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
}

type SwipeHook = (onSwipeLeft?: () => void, onSwipeRight?: () => void, swipeThresholdModifier?: number) => {
  onTouchStart: (e: GestureResponderEvent) => void,
  onTouchEnd: (e: GestureResponderEvent) => void
}

const useSwipe: SwipeHook = (onSwipeLeft, onSwipeRight, swipeThresholdModifier = 4) => {

  const { width } = useWindowDimensions();

  let initialTouchPoint: number;

  function onTouchStart(e: GestureResponderEvent) {
    initialTouchPoint = e.nativeEvent.pageX
  }

  function onTouchEnd(e: GestureResponderEvent) {

    const finalTouchPoint = e.nativeEvent.pageX
    const swipeThreshold = width / (swipeThresholdModifier || 4)

    if (finalTouchPoint - initialTouchPoint > swipeThreshold) {
      onSwipeRight && onSwipeRight()
    }
    else if (initialTouchPoint - finalTouchPoint > swipeThreshold) {
      onSwipeLeft && onSwipeLeft()
    }
  }

  return { onTouchStart, onTouchEnd };
}

const useStyle = () => {

  const { height, width } = useWindowDimensions();

  const styles = StyleSheet.create({
    main: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    play: {
      width: width < height ? width * 0.9 : height * 0.9,
      height: width < height ? width * 0.9 : height * 0.9,
    },
    row: {
      flex: 1,
      flexDirection: "row"
    },
    cell: {
      flex: 1,
      borderWidth: 2,
      justifyContent: "center",
      alignItems: "center",
    },
    piece: {
      fontSize: 80,
    }
  });

  return { styles }

}

type AdjacentCells = {
  top?: [number, number];
  topRight?: [number, number];
  right?: [number, number];
  bottomRight?: [number, number];
  bottom?: [number, number];
  bottomLeft?: [number, number];
  left?: [number, number];
  topLeft?: [number, number];
}

type ExcludeFilter = (row: number, col: number) => boolean

const getAdjacentCells = (matrixHeight: number, matrixWidth: number, row: number, col: number, exclude: ExcludeFilter = (row, col) => false): AdjacentCells => {

  const adjacentCells: AdjacentCells = {};

  let r: number, c: number

  --matrixHeight;
  --matrixWidth;

  const invalidCell = (row: number, col: number) => row < 0 || row > matrixHeight || col < 0 || col > matrixWidth ? true : false;

  if (invalidCell(row, col)) throw Error("Matrix: invalid cell coordinates");

  r = row - 1; c = col - 1; if (!invalidCell(r, c) && !exclude(r, c)) adjacentCells.topLeft = [r, c];
  r = row - 1; c = col; if (!invalidCell(r, c) && !exclude(r, c)) adjacentCells.top = [r, c];
  r = row - 1; c = col + 1; if (!invalidCell(r, c) && !exclude(r, c)) adjacentCells.topRight = [r, c];
  r = row; c = col - 1; if (!invalidCell(r, c) && !exclude(r, c)) adjacentCells.left = [r, c];
  r = row; c = col + 1; if (!invalidCell(r, c) && !exclude(r, c)) adjacentCells.right = [r, c];
  r = row + 1; c = col - 1; if (!invalidCell(r, c) && !exclude(r, c)) adjacentCells.bottomLeft = [r, c];
  r = row + 1; c = col; if (!invalidCell(r, c) && !exclude(r, c)) adjacentCells.bottom = [r, c];
  r = row + 1; c = col + 1; if (!invalidCell(r, c) && !exclude(r, c)) adjacentCells.bottomRight = [r, c];

  return adjacentCells;

}

const victoryFinder = (matrixSize: number, row: number, col: number, exclude: ExcludeFilter = (row, col) => false): [number, number][] | false => {

  type CordN = [number, number] | null
  type CordU = [number, number] | undefined

  const horizondal: (CordN)[] = [[row, col]];
  const vertical: (CordN)[] = [[row, col]];
  const diagonal: (CordN)[] = [[row, col]];
  const antidiagonal: (CordN)[] = [[row, col]];

  let top: CordU, left: CordU, right: CordU, bottom: CordU;
  let topLeft: CordU, topRight: CordU, bottomLeft: CordU, bottomRight: CordU;
  let cords: CordN;

  const adjacentCells = getAdjacentCells(matrixSize, matrixSize, row, col, exclude);

  vertical.unshift(adjacentCells.top || null)
  vertical.push(adjacentCells.bottom || null)
  horizondal.unshift(adjacentCells.left || null)
  horizondal.push(adjacentCells.right || null)
  diagonal.unshift(adjacentCells.topLeft || null)
  diagonal.push(adjacentCells.bottomRight || null)
  antidiagonal.unshift(adjacentCells.bottomLeft || null)
  antidiagonal.push(adjacentCells.topRight || null)

  const isCord = (cord: CordN): cord is [number, number] => cord ? true : false;

  let i = 0;

  const expandArray = (): false | [number, number][] => {
    cords = vertical[0]
    if (isCord(cords)) {
      top = getAdjacentCells(matrixSize, matrixSize, ...cords, exclude).top
      vertical.unshift(top || null);
    }

    cords = vertical[vertical.length - 1]
    if (isCord(cords)) {
      bottom = getAdjacentCells(matrixSize, matrixSize, ...cords, exclude).bottom
      vertical.push(bottom || null);
    }

    cords = horizondal[0]
    if (isCord(cords)) {
      left = getAdjacentCells(matrixSize, matrixSize, ...cords, exclude).left
      horizondal.unshift(left || null);
    }

    cords = horizondal[horizondal.length - 1]
    if (isCord(cords)) {
      right = getAdjacentCells(matrixSize, matrixSize, ...cords, exclude).right
      horizondal.push(right || null);
    }

    cords = diagonal[0]
    if (isCord(cords)) {
      topLeft = getAdjacentCells(matrixSize, matrixSize, ...cords, exclude).topLeft
      diagonal.unshift(topLeft || null);
    }

    cords = diagonal[diagonal.length - 1]
    if (isCord(cords)) {
      bottomRight = getAdjacentCells(matrixSize, matrixSize, ...cords, exclude).bottomRight
      diagonal.push(bottomRight || null);
    }

    cords = antidiagonal[0]
    if (isCord(cords)) {
      bottomLeft = getAdjacentCells(matrixSize, matrixSize, ...cords, exclude).bottomLeft
      antidiagonal.unshift(bottomLeft || null);
    }

    cords = antidiagonal[antidiagonal.length - 1]
    if (isCord(cords)) {
      topRight = getAdjacentCells(matrixSize, matrixSize, ...cords, exclude).topRight
      antidiagonal.push(topRight || null);
    }

    if (vertical.filter(isCord).length >= matrixSize) return vertical.filter(isCord);
    if (horizondal.filter(isCord).length >= matrixSize) return horizondal.filter(isCord);
    if (diagonal.filter(isCord).length >= matrixSize) return diagonal.filter(isCord);
    if (antidiagonal.filter(isCord).length >= matrixSize) return antidiagonal.filter(isCord);

    return false;
  }


  while (true) {
    if ([vertical, horizondal, diagonal, antidiagonal].every(arr => !isCord(arr[0]) && !isCord(arr[arr.length - 1]))) return false
    const result = expandArray();
    if (result) return result;
    i++
  }

}

export default App;