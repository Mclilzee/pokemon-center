import React from "react";
import { screen, render, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Alert from "../Alert";
import { BrowserRouter } from "react-router-dom";

describe("Completed alert rendering", () => {
  beforeEach(() => {
    act(() => {
      render(
        <BrowserRouter>
          <Alert message={"You have successfully added an item"} completed={true}/>
        </BrowserRouter>
      );
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
      render(
        <BrowserRouter>
          <Alert message={"You have failed to add an item"} completed={false}/>
        </BrowserRouter>
      );
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
});

describe("Buttons functionality handling", () => {
  const mockFunction = jest.fn();
  beforeEach(() => {
    act(() => {
      render(
        <BrowserRouter>
          <Alert message={"You have successfully added an item"} hideAlert={mockFunction}/>
        </BrowserRouter>
      );
    });
  });

  test("Contains continue shopping button", () => {
    const continueShopping = screen.getByRole("button", {name: "Continue Shopping"});
    expect(continueShopping).toBeInTheDocument();
  });

  test("Clicking continue shopping button calls the function", () => {
    const continueShopping = screen.getByRole("button", {name: "Continue Shopping"});
    userEvent.click(continueShopping);
    userEvent.click(continueShopping);
    expect(mockFunction).toBeCalledTimes(2);
  });

  test("Continue shopping button has correct link", () => {
    const goToCart = screen.getByRole("button", {name: "Continue Shopping"});
    expect(goToCart.parentElement).toHaveAttribute("href", "/store");
  });

  test("Contains go to cart button", () => {
    const goToCart = screen.getByRole("button", {name: "Go to cart"});
    expect(goToCart).toBeInTheDocument();
  });

  test("Clicking go to cart button calls the function", () => {
    const goToCart = screen.getByRole("button", {name: "Go to cart"});
    userEvent.click(goToCart);
    userEvent.click(goToCart);
    expect(mockFunction).toBeCalledTimes(2);
  });

  test("Go to cart button has correct link", () => {
    const goToCart = screen.getByRole("button", {name: "Go to cart"});
    expect(goToCart.parentElement).toHaveAttribute("href", "/cart");
  });
});