import React from "react";
import { screen, render, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Homepage from "../Homepage";

describe("Render Homepage correctly", () => {
  beforeEach(() => {
    act(() => {
      render(<Homepage/>);
    });
  });

  test("Homepage Renders", () => {
  });

  test("Homepage has pokemon ball image icon", () => {
    const pokeBall = screen.getByAltText("pokemon ball");
    expect(pokeBall).toBeInTheDocument();
  });

  test("Homepage have two headings", () => {
    const headings = screen.getAllByRole("heading");
    expect(headings.length).toBe(2);
  });

  test("Homepage has paragraph", () => {
    const paragraph = screen.getByTestId("description");
    expect(paragraph).toBeInTheDocument();
  });

  test("Homepage has warning message for loading png files", () => {
    const warningMessage = screen.getByTestId("warning-message");
    expect(warningMessage).toBeInTheDocument();
  });
});