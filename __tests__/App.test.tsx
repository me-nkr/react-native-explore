/**
 * @format
 */

import React from 'react';
import App from '../src/App';

import { describe, it, expect } from '@jest/globals';
import { render, screen } from "@testing-library/react-native";

describe("App", () => {

  it("should render app with playarea", () => {

    render(<App />);

    const samplePlayArea = screen.getByLabelText("play area");

    expect(samplePlayArea).toBeOnTheScreen();
  })
})
