/**
 * @format
 */

import { describe, it, expect } from '@jest/globals';

import { findVictory } from '../../src/utils';

describe("Tic Tac Toe victory detection", () => {

    describe("given a tic tac toe grid size and a cell cordinate", () => {

        it("should return false if the given cell does not create a victory", () => {

            const testGameData = [
                ["O", "X", "X"],
                ["X", "X", "O"],
                ["O", "O", "X"],
            ]

            const testPieceExculdeFilter = (row: number, col: number) => testGameData[row][col] !== "O";

            const sample = findVictory(3, 2, 1, testPieceExculdeFilter);

            expect(sample).toBe(false);

        })

        it("should return cordinates of cells that makes up the victory along with the given cell if it creates a victory", () => {

            const testGameData = [
                ["O", "X", "X"],
                ["X", "X", "O"],
                ["O", "O", "O"],
            ];
            const result = [[2,0], [2,1], [2,2]];

            const testPieceExculdeFilter = (row: number, col: number) => testGameData[row][col] !== "O";

            const sample = findVictory(3, 2, 1, testPieceExculdeFilter);

            expect(sample && sample.sort()).toEqual(result.sort());

        })

        it("should return cordinates of cells that makes up the victory along with the given cell if it creates multiple victories", () => {

            const testGameData = [
                ["O", "X", "O"],
                ["X", "X", "O"],
                ["O", "O", "O"],
            ];
            const possibleResults = [[[2,0], [2,1], [2,2]], [[0,2], [1,2], [2,2]]];

            const testPieceExculdeFilter = (row: number, col: number) => testGameData[row][col] !== "O";

            const sample = findVictory(3, 2, 1, testPieceExculdeFilter);

            expect(possibleResults.map(res => res.sort())).toContainEqual(sample && sample.sort());

        })

    })

})