/**
 * @format
 */

import { describe, it, expect } from '@jest/globals';

import { findAdjacent } from '../../src/utils';

describe("given matrix dimensions and cell cordinates", () => {

    it("should return cordinates of adjacent cells", () => {
        const result = {
            top: [1, 2],
            topLeft: [1, 1],
            left: [2, 1]
        }
        const sample = findAdjacent(3, 3, 2, 2);

        expect(sample).toEqual(result);
    })

    it("should not return cordinates of adjacent cells that will be excluded", () => {
        const testData = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ]
        const testExcludeFilter = (row: number, col: number) => testData[row][col] % 2 === 0;
        const result = { topLeft: [1,1] };
        const sample = findAdjacent(testData.length, testData[0].length, 2, 2, testExcludeFilter);

        expect(sample).toEqual(result);
    })

})