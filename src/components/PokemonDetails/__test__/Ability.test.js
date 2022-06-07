import React from "react";
import { screen, render, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Ability from "../Ability";

describe("Basic rendering", () => {
  test("Renders correctly", () => {
    act(() => {
      render(<Ability/>);
    });
  });

  test("Show correct ability name", () => {
    act(() => {
      render(<Ability name={"basic attack"}/>);
    });

    const ability = screen.getByText("basic attack");
    expect(ability).toBeInTheDocument();
  });

  test("Hidden message not to show", () => {
    act(() => {
      render(<Ability name={"torrent"} hidden={false}/>);
    });

    const hiddenMessage = screen.queryByText(/hidden/i);
    expect(hiddenMessage).not.toBeInTheDocument();
  });

  test("Hidden message to show on hidden abilities", () => {
    act(() => {
      render(<Ability name={"rain-dish"} hidden={true}/>);
    });

    const hiddenMessage = screen.getByText(/hidden/i);
    expect(hiddenMessage).toBeInTheDocument();
  });
});
