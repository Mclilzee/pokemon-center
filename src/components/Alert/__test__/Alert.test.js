import React from "react";
import { screen, render, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Alert from "../Alert";

describe("Completed alert rendering", () => {
  beforeEach(() => {
    act(() => {
      render(<Alert message={"You have successfully added an item"} completed={true}/>);
    });
  });

  test("Completed title in document", () => {
    const title = screen.getByRole("heading", {name: "Success!"});
    expect(title).toBeInTheDocument();
  });

  test("Message to be in document", () => {
    const message = screen.getByText("You have successfully added an item");
    expect(message).toBeInTheDocument();
  });

  test("Icon to be in document", () => {
    const icon = screen.getByRole("img");
    expect(icon).toBeInTheDocument();
  });

  test("Alert to have correct icon", () => {
    const icon = screen.getByRole("img");
    expect(icon).toHaveAttribute("src", "completed.svg");
  });
});

describe("Error alert rendering", () => {
  beforeEach(() => {
    act(() => {
      render(<Alert message={"You have failed to add an item"} completed={false}/>);
    });
  });

  test("Error title in document", () => {
    const title = screen.getByRole("heading", {name: "Error"});
    expect(title).toBeInTheDocument();
  });

  test("Error message to bei ndocument", () => {
    const message = screen.getByText("You have failed to add an item");
    expect(message).toBeInTheDocument();
  });

  test("Error Icon to be in document", () => {
    const icon = screen.getByRole("img");
    expect(icon).toBeInTheDocument();
  });

  test("Error Alert to have correct icon", () => {
    const icon = screen.getByRole("img");
    expect(icon).toHaveAttribute("src", "error.svg");
  });
})