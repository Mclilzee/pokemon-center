import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Homepage from "./Homepage";

describe("Render Homepage correctly", () => {

  test("Homepage Renders", () => {
    render(<Homepage/>);
  });

  test("Homepage have two headings", () => {
    render(<Homepage/>);

    const headings = screen.getAllByRole("heading");
    expect(headings.length).toBe(2);
  });

  test("Homepage has paragraph", () => {
    render(<Homepage/>);

    const paragraph = screen.getByTestId("description");
    expect(paragraph).toBeInTheDocument();
  });
});