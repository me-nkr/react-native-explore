/**
 * @format
 */

import { describe, it, expect, afterEach, jest } from '@jest/globals';
import { render, screen, userEvent } from "@testing-library/react-native";

import { GameState } from '../../src/types';
import { Grid } from '../../src/components';

import * as RN from "react-native";

describe("Grid", () => {

    describe("cells", () => {

        it("should have rows according to gameState size", () => {

            const testGameState: GameState = [
                [{}, {}, {}],
                [{}, {}, {}],
                [{}, {}, {}]
            ]

            render(<Grid
                cellPressHandler={() => { }}
                gameState={testGameState}
            />)

            const sampleGrid = screen.getByLabelText("tic tac toe grid");
            const sampleRows = screen.getAllByLabelText(/^row\s\d+$/);

            expect(sampleRows.length).toBe(testGameState.length);
            sampleRows.forEach(row => expect(sampleGrid).toContainElement(row));

        });

        it("should have cells according to gameState in each row", () => {

            const testGameState: GameState = [
                [{}, {}, {}],
                [{}, {}, {}],
                [{}, {}, {}]
            ]

            render(<Grid
                cellPressHandler={() => { }}
                gameState={testGameState}
            />)

            const sampleGrid = screen.getByLabelText("tic tac toe grid");
            const sampleRows = screen.getAllByLabelText(/^row\s\d+$/);
            const sampleCells = screen.getAllByLabelText(/^cell\s\d+\s\d+$/);

            expect(sampleRows.length).toBe(testGameState.length);
            expect(sampleCells.length).toBe(testGameState.length * testGameState.length);
            sampleRows.forEach((row, rowNum) => {
                expect(sampleGrid).toContainElement(row);

                const cells = screen.getAllByLabelText(RegExp(`^cell\\s${rowNum}\\s\\d+`))
                expect(cells.length).toBe(testGameState.length)
                cells.forEach(cell => expect(row).toContainElement(cell));
            });

        });
    })
    describe("border", () => {

        const getBorderCells = (borders?: boolean) => {

            const testGameState: GameState = [
                [{}, {}, {}],
                [{}, {}, {}],
                [{}, {}, {}]
            ]

            render(<Grid
                cellPressHandler={() => { }}
                gameState={testGameState}
                borders={borders}
            />);

            const max = testGameState.length - 1;

            return {
                topLeft: screen.getByLabelText("cell 0 0"),
                topRight: screen.getByLabelText("cell 0 " + max),
                bottomLeft: screen.getByLabelText("cell " + max + " 0"),
                bottomRight: screen.getByLabelText("cell " + max + " " + max),
                top: screen.getAllByLabelText(/^cell\s0\s\d+$/),
                bottom: screen.getAllByLabelText(RegExp(`^cell\\s${max}\\s\\d+$`)),
                left: screen.getAllByLabelText(/^cell\s\d+\s0$/),
                right: screen.getAllByLabelText(RegExp(`^cell\\s\\d+\\s${max}$`)),
            };

        }

        it("should have borders when borders is true", () => {

            const {
                top,
                bottom,
                left,
                right,
                topLeft,
                topRight,
                bottomLeft,
                bottomRight
            } = getBorderCells(true);

            top.forEach(cell => expect(cell).toHaveStyle({ borderTopWidth: 2 }));
            bottom.forEach(cell => expect(cell).toHaveStyle({ borderBottomWidth: 2 }));
            left.forEach(cell => expect(cell).toHaveStyle({ borderLeftWidth: 2 }));
            right.forEach(cell => expect(cell).toHaveStyle({ borderRightWidth: 2 }));
            expect(topLeft).toHaveStyle({ borderTopWidth: 2, borderLeftWidth: 2 });
            expect(topRight).toHaveStyle({ borderTopWidth: 2, borderRightWidth: 2 });
            expect(bottomLeft).toHaveStyle({ borderBottomWidth: 2, borderLeftWidth: 2 });
            expect(bottomRight).toHaveStyle({ borderBottomWidth: 2, borderRightWidth: 2 });
        });

        it("should not have borders when borders is false", () => {

            const {
                top,
                bottom,
                left,
                right,
                topLeft,
                topRight,
                bottomLeft,
                bottomRight
            } = getBorderCells(false);

            top.forEach(cell => expect(cell).toHaveStyle({ borderTopWidth: 0 }));
            bottom.forEach(cell => expect(cell).toHaveStyle({ borderBottomWidth: 0 }));
            left.forEach(cell => expect(cell).toHaveStyle({ borderLeftWidth: 0 }));
            right.forEach(cell => expect(cell).toHaveStyle({ borderRightWidth: 0 }));
            expect(topLeft).toHaveStyle({ borderTopWidth: 0, borderLeftWidth: 0 });
            expect(topRight).toHaveStyle({ borderTopWidth: 0, borderRightWidth: 0 });
            expect(bottomLeft).toHaveStyle({ borderBottomWidth: 0, borderLeftWidth: 0 });
            expect(bottomRight).toHaveStyle({ borderBottomWidth: 0, borderRightWidth: 0 });
        });

        it("should not have borders when borders is undefined", () => {

            const {
                top,
                bottom,
                left,
                right,
                topLeft,
                topRight,
                bottomLeft,
                bottomRight
            } = getBorderCells(undefined);

            top.forEach(cell => expect(cell).toHaveStyle({ borderTopWidth: 0 }));
            bottom.forEach(cell => expect(cell).toHaveStyle({ borderBottomWidth: 0 }));
            left.forEach(cell => expect(cell).toHaveStyle({ borderLeftWidth: 0 }));
            right.forEach(cell => expect(cell).toHaveStyle({ borderRightWidth: 0 }));
            expect(topLeft).toHaveStyle({ borderTopWidth: 0, borderLeftWidth: 0 });
            expect(topRight).toHaveStyle({ borderTopWidth: 0, borderRightWidth: 0 });
            expect(bottomLeft).toHaveStyle({ borderBottomWidth: 0, borderLeftWidth: 0 });
            expect(bottomRight).toHaveStyle({ borderBottomWidth: 0, borderRightWidth: 0 });
        });

    })

})

describe("height and width", () => {

    afterEach(() => {
        jest.restoreAllMocks();
    })

    it("should be 90% of width when in portrait", () => {

        jest.spyOn(RN, "useWindowDimensions").mockReturnValue({
            height: 400,
            width: 100,
            scale: 1,
            fontScale: 1
        })

        const testGameState: GameState = [
            [{}, {}, {}],
            [{}, {}, {}],
            [{}, {}, {}]
        ]

        render(<Grid
            cellPressHandler={() => { }}
            gameState={testGameState}
        />);

        const sample = screen.getByLabelText("tic tac toe grid");

        expect(sample).toHaveStyle({ height: 90, width: 90 });
    });

    it("should be 90% of height when in landscape", () => {

        jest.spyOn(RN, "useWindowDimensions").mockReturnValue({
            height: 100,
            width: 400,
            scale: 1,
            fontScale: 1
        })

        const testGameState: GameState = [
            [{}, {}, {}],
            [{}, {}, {}],
            [{}, {}, {}]
        ]

        render(<Grid
            cellPressHandler={() => { }}
            gameState={testGameState}
        />);

        const sample = screen.getByLabelText("tic tac toe grid");

        expect(sample).toHaveStyle({ height: 90, width: 90 });
    });
})

it("should have rows with flex direction row", () => {

    const testGameState: GameState = [
        [{}, {}, {}],
        [{}, {}, {}],
        [{}, {}, {}]
    ]

    render(<Grid
        cellPressHandler={() => { }}
        gameState={testGameState}
    />)

    const sampleRows = screen.getAllByLabelText(/^row\s\d+$/);

    sampleRows.forEach(row => expect(row).toHaveStyle({ flex: 1, flexDirection: "row" }));

});