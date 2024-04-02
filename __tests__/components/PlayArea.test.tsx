/**
 * @format
 */

import { describe, it, expect, jest } from "@jest/globals";
import { fireEvent, render, screen, userEvent } from "@testing-library/react-native";
import type { GestureResponderEvent } from "react-native";

import type { GameState } from "../../src/types";
import { PlayArea } from "../../src/components";

describe("Play Area", () => {

    describe("grid", () => {

        it("should have grid rendered inside", () => {

            const testGameState: GameState = [
                [{}, {}, {}],
                [{}, {}, {}],
                [{}, {}, {}]
            ]

            render(<PlayArea
                swipeHandlers={{
                    onTouchStart: () => { },
                    onTouchEnd: () => { }
                }}
                cellPressHandler={() => { }}
                gameState={testGameState}
            />)

            const samplePlayArea = screen.getByLabelText("play area");
            const sampleGrid = screen.getByLabelText("tic tac toe grid");

            expect(samplePlayArea).toContainElement(sampleGrid);
        });
    })

})

it("should call appropriate callbacks on start and end of a swipe", () => {

    const swipe = {
        onTouchStart: jest.fn<(e: GestureResponderEvent) => void>(),
        onTouchEnd: jest.fn<(e: GestureResponderEvent) => void>()
    }

    const testGameState: GameState = [
        [{}, {}, {}],
        [{}, {}, {}],
        [{}, {}, {}]
    ]

    render(<PlayArea
        swipeHandlers={swipe}
        cellPressHandler={() => { }}
        gameState={testGameState}
    />)

    const samplePlayArea = screen.getByLabelText("play area");

    fireEvent(samplePlayArea, "touchStart");
    fireEvent(samplePlayArea, "touchEnd");

    expect(swipe.onTouchStart).toHaveBeenCalled();
    expect(swipe.onTouchEnd).toHaveBeenCalled();
});

it("should be flexbox with everything centered", () => {

    const testGameState: GameState = [
        [{}, {}, {}],
        [{}, {}, {}],
        [{}, {}, {}]
    ]

    render(<PlayArea
        swipeHandlers={{
            onTouchStart: () => { },
            onTouchEnd: () => { }
        }}
        cellPressHandler={() => { }}
        gameState={testGameState}
    />)

    const samplePlayArea = screen.getByLabelText("play area");

    expect(samplePlayArea).toHaveStyle({ flex: 1, justifyContent: "center", alignItems: "center" })
});