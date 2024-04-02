
/**
 * @format
 */

import { describe, it, expect } from '@jest/globals';
import { render, screen } from "@testing-library/react-native";

import { PieceO, PieceX } from '../../src/components';

describe("Piece O", () => {

    it("should have text value O", () => {

        render(<PieceO winState={false}/>);

        const sample = screen.getByLabelText("piece O");

        expect(sample).toHaveTextContent("O", { exact: true })
    });

    it("shold have font size 80", () => {

        render(<PieceO winState={false}/>);

        const sample = screen.getByLabelText("piece O");

        expect(sample).toHaveStyle({ fontSize: 80 });

    });

    it("should be black when winState is false", () => {

        render(<PieceO winState={false}/>);

        const sample = screen.getByLabelText("piece O");

        expect(sample).toHaveStyle({ color: "#000" });

    });

    it("should be black when winState is undefined", () => {

        render(<PieceO winState={undefined}/>);

        const sample = screen.getByLabelText("piece O");

        expect(sample).toHaveStyle({ color: "#000" });

    });

    it("should be emerald green when winState is true", () => {

        render(<PieceO winState={true}/>);

        const sample = screen.getByLabelText("piece O");

        expect(sample).toHaveStyle({ color: "#50c878" });

    });

})

describe("Piece X", () => {

    it("should have text value X", () => {

        render(<PieceX winState={false}/>);

        const sample = screen.getByLabelText("piece X");

        expect(sample).toHaveTextContent("X", { exact: true })
    });

    it("shold have font size 80", () => {

        render(<PieceX winState={false}/>);

        const sample = screen.getByLabelText("piece X");

        expect(sample).toHaveStyle({ fontSize: 80 });

    });

    it("should be black when winState is false", () => {

        render(<PieceX winState={false}/>);

        const sample = screen.getByLabelText("piece X");

        expect(sample).toHaveStyle({ color: "#000" });

    });

    it("should be black when winState is undefined", () => {

        render(<PieceX winState={undefined}/>);

        const sample = screen.getByLabelText("piece X");

        expect(sample).toHaveStyle({ color: "#000" });

    });

    it("should be emerald green when winState is true", () => {

        render(<PieceX winState={true}/>);
        
        const sample = screen.getByLabelText("piece X");

        expect(sample).toHaveStyle({ color: "#50c878" });

    });

})