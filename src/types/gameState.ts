type CellState =
  {
    player?: "playerO" | "playerX";
    winState?: boolean;
    disabled?: boolean;
  }

export type GameState = [
  [CellState, CellState, CellState],
  [CellState, CellState, CellState],
  [CellState, CellState, CellState]
];