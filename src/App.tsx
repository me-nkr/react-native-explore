import React, { useState, useEffect, useReducer } from 'react';
import { Alert } from 'react-native';

import type { GameState } from './types';

import { useSwipe } from './hooks';
import { gameReducer } from './reducers';
import { resetGame, handleEnd, handlePlay } from './utils';
import { PlayArea } from './components';

const App = () => {

  const initialGameState: GameState = [
    [{}, {}, {}],
    [{}, {}, {}],
    [{}, {}, {}]
  ];

  const [player, togglePlayer] = useState<"playerO" | "playerX">("playerO");
  const [victory, setVictory] = useState<boolean>(false);
  const [lastPlayed, setLastPlayed] = useState<[number | null, number | null]>([null, null]);

  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);

  useEffect(() => {
    console.log(lastPlayed)
    handleEnd(lastPlayed, victory, setVictory, gameState, dispatch, Alert.alert);
    console.log(gameState)
  }, [gameState])

  const swipe = useSwipe(() => resetGame(togglePlayer, setLastPlayed, setVictory, dispatch));

  return (
    <PlayArea
      gameState={gameState}
      swipeHandlers={swipe}
      cellPressHandler={(row, col) => handlePlay(player, [row, col], togglePlayer, setLastPlayed, dispatch)}
    />
  );
};

// interface CellProps {
//   borderlessSides?: ("top" | "left" | "right" | "bottom")[];
//   index: [number, number];
//   gameState: GameState;
//   setGameState: React.Dispatch<React.SetStateAction<GameState>>;
//   player: "one" | "two";
//   setPlayer: React.Dispatch<React.SetStateAction<"one" | "two">>;
//   status: "idle" | "reset" | "complete";
//   setStatus: React.Dispatch<React.SetStateAction<"idle" | "reset" | "complete">>;
// }

// const Cell = ({ borderlessSides, index, gameState, setGameState, player, setPlayer, status, setStatus }: CellProps) => {

//   const [used, setUsed] = useState<boolean>(false);

//   const [row, col] = index;

//   useEffect(() => {
//     if (status === "reset") {
//       setUsed(false);
//       setStatus("idle");
//     }
//     if (status === "complete") setUsed(true);
//   }, [status])

//   const setCellState = ([row, col]: [number, number], content: "X" | "O"): void => {
//     const tempState = gameState;
//     tempState[row][col].content = content;
//     const victory = findVictory(tempState.length, row, col, (row, col) => tempState[row][col].content !== content)
//     if (victory) {
//       for (let [row, col] of victory) {
//         tempState[row][col].winState = true;
//       }
//       setStatus("complete");
//       Alert.alert("Player " + player + " won", "Swipe from right to reset")
//     }
//     else {
//       if (tempState.flat().every(({ content }) => content !== ""))
//       Alert.alert("Game tie", "Swipe from right to reset");
//     }
//     setGameState(tempState);
//   }

//   const handleTurn = () => {
//     setUsed(true);

//     switch (player) {
//       case "one":
//         setCellState(index, "O");
//         setPlayer("two")
//         break;
//       case "two":
//         setCellState(index, "X");
//         setPlayer("one")
//         break;
//     }
//   }

//   const { styles } = useStyle();

//   const borders: ViewStyle = {};

//   if (borderlessSides && borderlessSides.includes("top")) borders.borderTopWidth = 0;
//   if (borderlessSides && borderlessSides.includes("left")) borders.borderLeftWidth = 0;
//   if (borderlessSides && borderlessSides.includes("right")) borders.borderRightWidth = 0;
//   if (borderlessSides && borderlessSides.includes("bottom")) borders.borderBottomWidth = 0;

//   return (
//     <TouchableNativeFeedback
//       disabled={used}
//       onPress={handleTurn}
//     >
//       <View
//         style={[styles.cell, borders]}
//       >
//         {
//           gameState[row][col].content === "X" ? (<PieceX winState={gameState[row][col].winState} />) :
//           gameState[row][col].content === "O" ? (<PieceO winState={gameState[row][col].winState} />) :
//           ""
//         }
//       </View>
//     </TouchableNativeFeedback>
//   );
// }

// type SwipeHook = (onSwipeLeft?: () => void, onSwipeRight?: () => void, swipeThresholdModifier?: number) => {
//   onTouchStart: (e: GestureResponderEvent) => void,
//   onTouchEnd: (e: GestureResponderEvent) => void
// }

// const useSwipe: SwipeHook = (onSwipeLeft, onSwipeRight, swipeThresholdModifier = 4) => {

//   const { width } = useWindowDimensions();


//   let initialTouchPoint: number;

//   function onTouchStart(e: GestureResponderEvent) {
//     initialTouchPoint = e.nativeEvent.pageX
//   }

//   function onTouchEnd(e: GestureResponderEvent) {

//     const finalTouchPoint = e.nativeEvent.pageX
//     const swipeThreshold = width / (swipeThresholdModifier || 4)

//     if (finalTouchPoint - initialTouchPoint > swipeThreshold) {
//       onSwipeRight && onSwipeRight()
//     }
//     else if (initialTouchPoint - finalTouchPoint > swipeThreshold) {
//       onSwipeLeft && onSwipeLeft()
//     }
//   }

//   return { onTouchStart, onTouchEnd };
// }

// const useStyle = () => {

//   const { height, width } = useWindowDimensions();

//   const styles = StyleSheet.create({
//     main: {
//       flex: 1,
//       justifyContent: "center",
//       alignItems: "center"
//     },
//     play: {
//       width: width < height ? width * 0.9 : height * 0.9,
//       height: width < height ? width * 0.9 : height * 0.9,
//     },
//     row: {
//       flex: 1,
//       flexDirection: "row"
//     },
//     cell: {
//       flex: 1,
//       borderWidth: 2,
//       justifyContent: "center",
//       alignItems: "center",
//     },
//     piece: {
//       fontSize: 80,
//     }
//   });

//   return { styles }

// }

export default App;