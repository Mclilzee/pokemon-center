import React from "react";
import { screen, render, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Type from "../Type";

describe("Basic rendering", () => {
  test("Renders correctly", () => {
    act(() => {
      render(<Type/>);
    });
  });

  test("Renders the correct type name", () => {
    act(() => {
      render(<Type name={"water"}/>);
    });

    const typeName = screen.getByText("Water");
    expect(typeName).toBeInTheDocument();
  });
});