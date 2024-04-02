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
    handleEnd(lastPlayed, victory, setVictory, gameState, dispatch, Alert.alert);
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

export default App;