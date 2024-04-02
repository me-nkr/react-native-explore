export type GameActions =
| { type: "play", index: [number, number], player: "playerO" | "playerX" }
| { type: "reset" }
| { type: "victory", indices: [number, number][] }