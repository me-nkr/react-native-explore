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

export default (matrixHeight: number, matrixWidth: number, row: number, col: number, exclude = (row: number, col: number) => false): AdjacentCells => {

  const adjacentCells: AdjacentCells = {}

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