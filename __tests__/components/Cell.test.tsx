/**
 * @format
 */

import { describe, it, expect, jest } from '@jest/globals';
import { render, screen, userEvent } from "@testing-library/react-native";

import { Cell } from "../../src/components";

describe("Cell", () => {

    describe("border", () => {

        it("should have no border", () => {

            render(<Cell
                disabled={false}
                index={[0, 0]}
                pressHandler={() => { }}
                player="playerO"
                winState={false}
            />);

            const sample = screen.getByLabelText("cell 0 0");

            expect(sample).toHaveStyle({ borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0 });
        });

        it("should only have top border", () => {

            render(<Cell
                borders={{ top: true }}
                disabled={false}
                index={[0, 0]}
                pressHandler={() => { }}
                player="playerO"
                winState={false}
            />);

            const sample = screen.getByLabelText("cell 0 0");

            expect(sample).toHaveStyle({ borderTopWidth: 2, borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0 });
        });

        it("should only have bottom border", () => {

            render(<Cell
                borders={{ bottom: true }}
                disabled={false}
                index={[0, 0]}
                pressHandler={() => { }}
                player="playerO"
                winState={false}
            />);

            const sample = screen.getByLabelText("cell 0 0");

            expect(sample).toHaveStyle({ borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 2 });
        });

        it("should only have left border", () => {

            render(<Cell
                borders={{ right: false, left: true }}
                disabled={false}
                index={[0, 0]}
                pressHandler={() => { }}
                player="playerO"
                winState={false}
            />);

            const sample = screen.getByLabelText("cell 0 0");

            expect(sample).toHaveStyle({ borderTopWidth: 0, borderLeftWidth: 2, borderRightWidth: 0, borderBottomWidth: 0 });
        });

        it("should only have right border", () => {

            render(<Cell
                borders={{ right: true, left: false }}
                disabled={false}
                index={[0, 0]}
                pressHandler={() => { }}
                player="playerO"
                winState={false}
            />);

            const sample = screen.getByLabelText("cell 0 0");

            expect(sample).toHaveStyle({ borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 2, borderBottomWidth: 0 });
        });

    })

    describe("disabled", () => {

        it("should be disabled when disabled is true", () => {

            render(<Cell
                borders={{ right: true, left: false }}
                disabled={true}
                index={[0, 0]}
                pressHandler={() => { }}
                player="playerO"
                winState={false}
            />);

            const sample = screen.getByLabelText("cell 0 0");

            expect(sample).toBeDisabled();
        });

        it("should be not be disabled when disabled is false", () => {

            render(<Cell
                borders={{ right: true, left: false }}
                disabled={false}
                index={[0, 0]}
                pressHandler={() => { }}
                player="playerO"
                winState={false}
            />);

            const sample = screen.getByLabelText("cell 0 0");

            expect(sample).toBeEnabled();
        });

        it("should not be disabled when disabled is undefined", () => {

            render(<Cell
                borders={{ right: true, left: false }}
                disabled={undefined}
                index={[0, 0]}
                pressHandler={() => { }}
                player="playerO"
                winState={false}
            />);

            const sample = screen.getByLabelText("cell 0 0");

            expect(sample).toBeEnabled();
        });

    })

    it("should call the callback when pressed upon", async () => {

        jest.useFakeTimers();
        const testHandler = jest.fn<(row: number, col: number) => void>().mockName("testHandler");

        render(<Cell
            borders={{ right: true, left: false }}
            disabled={false}
            index={[1, 2]}
            pressHandler={testHandler}
            player="playerO"
            winState={false}
        />);

        const sample = screen.getByLabelText("cell 1 2");

        await userEvent.press(sample)

        expect(testHandler).toHaveBeenCalledWith(1, 2);
    });

    it("should have content in center", () => {

        render(<Cell
            borders={{ right: true, left: false }}
            disabled={false}
            index={[2, 1]}
            pressHandler={() => { }}
            player="playerO"
            winState={false}
        />);

        const sample = screen.getByLabelText("cell 2 1");

        expect(sample).toHaveStyle({ flex: 1, justifyContent: "center", alignItems: "center" });
    });

    describe("piece", () => {

        it("should contain PieceO", () => {

            render(<Cell
                borders={{ top: true, bottom: true, right: true, left: false }}
                disabled={false}
                index={[2, 1]}
                pressHandler={() => { }}
                player="playerO"
                winState={false}
            />);

            const sample = screen.getByLabelText("cell 2 1");
            const piece = screen.getByLabelText("piece O");

            expect(sample).toContainElement(piece);
        });

        it("should contain Piecex", () => {

            render(<Cell
                borders={{ top: true, bottom: true, right: true, left: false }}
                disabled={false}
                index={[2, 1]}
                pressHandler={() => { }}
                player="playerX"
                winState={false}
            />);

            const sample = screen.getByLabelText("cell 2 1");
            const piece = screen.getByLabelText("piece X");

            expect(sample).toContainElement(piece);
        });

        it("should contain no Piece", () => {

            render(<Cell
                borders={{ top: true, bottom: true, right: true, left: false }}
                disabled={false}
                index={[2, 1]}
                pressHandler={() => { }}
                player={undefined}
                winState={false}
            />);

            const sample = screen.getByLabelText("cell 2 1");

            expect(sample).toHaveTextContent("");
        });

    })

})