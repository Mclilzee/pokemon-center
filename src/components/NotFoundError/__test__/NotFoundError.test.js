import React from "react";
import { act, screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import NotFoundError from "../NotFoundError";

describe("Basic rendering", () => {

  test("Renders correctly", () => {
    act(() => {
      render(<NotFoundError/>);
    });

  });

  test("Pokemon Ball image show", () => {
    act(() => {
      render(<NotFoundError/>);
    });

    const errorImage = screen.getByAltText("pokemon ball");
    expect(errorImage).toBeInTheDocument();
  });

  test("Render error number", () => {
    act(() => {
      render(<NotFoundError/>);
    });

    const errorNumber = screen.getByText("404");
    expect(errorNumber).toBeInTheDocument();
  });

  test("Pokemon name and error message are shown", () => {
    act(() => {
      render(<NotFoundError pokemonName={"bulbasaur"}/>);
    });

    const pokemonName = screen.getByText(/bulbasaur/i);
    expect(pokemonName).toBeInTheDocument();
  });
});