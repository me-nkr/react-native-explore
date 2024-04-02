import React from "react";
import { Text } from "react-native";

interface PieceProps {
    winState: boolean | undefined;
}


export const PieceO: React.FC<PieceProps> = ({ winState }: PieceProps) => {
    return (
        <Text
            accessibilityLabel="piece O"
            style={{ fontSize: 80, color: winState ? "#50c878" : "#000" }}
        >O</Text>
    );
}

export const PieceX: React.FC<PieceProps> = ({ winState }: PieceProps) => {
    return (
        <Text
            accessibilityLabel="piece X"
            style={{ fontSize: 80, color: winState ? "#50c878" : "#000" }}
        >X</Text>
    );
}