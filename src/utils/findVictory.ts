import findAdjacent from "./findAdjacent";

export default (matrixSize: number, row: number, col: number, exclude = (row: number, col: number) => false): [number, number][] | false => {

  type CordN = [number, number] | null
  type CordU = [number, number] | undefined

  const horizondal: (CordN)[] = [[row, col]];
  const vertical: (CordN)[] = [[row, col]];
  const diagonal: (CordN)[] = [[row, col]];
  const antidiagonal: (CordN)[] = [[row, col]];

  let top: CordU, left: CordU, right: CordU, bottom: CordU;
  let topLeft: CordU, topRight: CordU, bottomLeft: CordU, bottomRight: CordU;
  let cords: CordN;

  const adjacentCells = findAdjacent(matrixSize, matrixSize, row, col, exclude);

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
      top = findAdjacent(matrixSize, matrixSize, ...cords, exclude).top
      vertical.unshift(top || null);
    }

    cords = vertical[vertical.length - 1]
    if (isCord(cords)) {
      bottom = findAdjacent(matrixSize, matrixSize, ...cords, exclude).bottom
      vertical.push(bottom || null);
    }

    cords = horizondal[0]
    if (isCord(cords)) {
      left = findAdjacent(matrixSize, matrixSize, ...cords, exclude).left
      horizondal.unshift(left || null);
    }

    cords = horizondal[horizondal.length - 1]
    if (isCord(cords)) {
      right = findAdjacent(matrixSize, matrixSize, ...cords, exclude).right
      horizondal.push(right || null);
    }

    cords = diagonal[0]
    if (isCord(cords)) {
      topLeft = findAdjacent(matrixSize, matrixSize, ...cords, exclude).topLeft
      diagonal.unshift(topLeft || null);
    }

    cords = diagonal[diagonal.length - 1]
    if (isCord(cords)) {
      bottomRight = findAdjacent(matrixSize, matrixSize, ...cords, exclude).bottomRight
      diagonal.push(bottomRight || null);
    }

    cords = antidiagonal[0]
    if (isCord(cords)) {
      bottomLeft = findAdjacent(matrixSize, matrixSize, ...cords, exclude).bottomLeft
      antidiagonal.unshift(bottomLeft || null);
    }

    cords = antidiagonal[antidiagonal.length - 1]
    if (isCord(cords)) {
      topRight = findAdjacent(matrixSize, matrixSize, ...cords, exclude).topRight
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