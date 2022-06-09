import React from "react";
import { screen, render, act, getByText } from "@testing-library/react";
import "@testing-library/jest-dom";
import Stat from "../Stat";

describe("Basic rendering", () => {
  test("Renders correctly", () => {
    act(() => {
      render(<Stat/>);
    });
  });

  test("Render the right name", () => {
    act(() => {
      render(<Stat name={"Attack"}/>);
    });

    const statName = screen.getByText(/attack/i);
    expect(statName).toBeInTheDocument();
  });

  test("Render the right number", () => {
    act(() => {
      render(<Stat number={30}/>);
    });

    const statNumber = screen.getByText(/30/i);
    expect(statNumber).toBeInTheDocument();
  });

  test("Had correct class name", () => {
    act(() => {
      render(<Stat className="hp" name={"Hp"}/>);
    });

    const statElement = screen.getByText(/hp/i);
    expect(statElement).toHaveClass("hp");
  });
});