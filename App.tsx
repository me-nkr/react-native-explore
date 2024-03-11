import React, { PropsWithChildren, useState, useEffect } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  useWindowDimensions,
  ViewStyle,
  GestureResponderEvent
} from 'react-native';

type CellContent = "X" | "O" | ""
type GameState = [
  CellContent, CellContent, CellContent,
  CellContent, CellContent, CellContent,
  CellContent, CellContent, CellContent
];

const App = () => {

  const [player, setPlayer] = useState<"one" | "two">("one");
  const [gameState, setGameState] = useState<GameState>(["", "", "", "", "", "", "", "", ""]);
  const [reset, setReset] = useState<boolean>(false);

  const { styles } = useStyle();

  const resetGameState = () => {
    setGameState(["", "", "", "", "", "", "", "", ""])
    setReset(true);
  }

  const { onTouchStart, onTouchEnd } = useSwipe(resetGameState);

  return (
    <SafeAreaView style={styles.main} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <View style={styles.play}>
        <View style={styles.row}>
          <Cell
            index={0}
            borderlessSides={["top", "left"]}
            gameState={gameState}
            setGameState={setGameState}
            player={player}
            setPlayer={setPlayer}
            reset={reset}
            setReset={setReset}
          />
          <Cell
            index={1}
            borderlessSides={["top"]}
            gameState={gameState}
            setGameState={setGameState}
            player={player}
            setPlayer={setPlayer}
            reset={reset}
            setReset={setReset}
          />
          <Cell
            index={2}
            borderlessSides={["top", "right"]}
            gameState={gameState}
            setGameState={setGameState}
            player={player}
            setPlayer={setPlayer}
            reset={reset}
            setReset={setReset}
          />
        </View>
        <View style={styles.row}>
          <Cell
            index={3}
            borderlessSides={["left"]}
            gameState={gameState}
            setGameState={setGameState}
            player={player}
            setPlayer={setPlayer}
            reset={reset}
            setReset={setReset}
          />
          <Cell
            index={4}
            gameState={gameState}
            setGameState={setGameState}
            player={player}
            setPlayer={setPlayer}
            reset={reset}
            setReset={setReset}
          />
          <Cell
            index={5}
            borderlessSides={["right"]}
            gameState={gameState}
            setGameState={setGameState}
            player={player}
            setPlayer={setPlayer}
            reset={reset}
            setReset={setReset}
          />
        </View>
        <View style={styles.row}>
          <Cell
            index={6}
            borderlessSides={["bottom", "left"]}
            gameState={gameState}
            setGameState={setGameState}
            player={player}
            setPlayer={setPlayer}
            reset={reset}
            setReset={setReset}
          />
          <Cell
            index={7}
            borderlessSides={["bottom"]}
            gameState={gameState}
            setGameState={setGameState}
            player={player}
            setPlayer={setPlayer}
            reset={reset}
            setReset={setReset}
          />
          <Cell
            index={8}
            borderlessSides={["bottom", "right"]}
            gameState={gameState}
            setGameState={setGameState}
            player={player}
            setPlayer={setPlayer}
            reset={reset}
            setReset={setReset}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

interface CellProps {
  borderlessSides?: ("top" | "left" | "right" | "bottom")[];
  index: number;
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  player: "one" | "two";
  setPlayer: React.Dispatch<React.SetStateAction<"one" | "two">>;
  reset: boolean;
  setReset: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cell = ({ borderlessSides, index, gameState, setGameState, player, setPlayer, reset, setReset }: CellProps) => {

  const [used, setUsed] = useState<boolean>(false);

  useEffect(() => {
    if (reset) setUsed(false);
    setReset(false);
  }, [reset])

  const setCellState = (index: number, content: "X" | "O"): void => {
    const tempState = gameState;
    tempState[index] = content;
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
        <Text style={styles.piece}>{gameState[index]}</Text>
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
      color: "#000"
    }
  });

  return { styles }

}

export default App;