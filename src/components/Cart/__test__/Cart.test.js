import React from "react";
import { screen, render, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Cart from "../Cart";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const cartContent = {
  "pikachu":
    {
      name: "pikachu",
      icon: "pikachu.com",
      amount: 5
    },

  "bulbasaur":
    {
      name: "bulbasaur",
      icon: "bulbasaur.com",
      amount: 10
    }
};

const removePokemon = jest.fn();
const clearCart = jest.fn();
const confirmPurchase = jest.fn();
const handleAmountChange = jest.fn();


beforeEach(() => {
  act(() => {
    render(<BrowserRouter>
        <Cart
          pokemons={cartContent}
          removePokemon={removePokemon}
          clearCart={clearCart}
          confirmPurchase={confirmPurchase}
          handleAmountChange={handleAmountChange}
        />
      </BrowserRouter>
    );
  });
});

describe("Basic rendering", () => {
  test("Contains confirm purchase button", () => {
    const confirmPurchaseButton = screen.getByRole("button", {name: "Confirm purchase"});
    expect(confirmPurchaseButton).toBeInTheDocument();
  });

  test("Contains clear cart button", () => {
    const clearCartButton = screen.getByRole("button", {name: "Clear cart"});
    expect(clearCartButton).toBeInTheDocument();
  });

  test("Cart contains two pokemon links", () => {
    const links = screen.getAllByRole("link");
    expect(links.length).toBe(2);
  });

  test("Cart contains two images", () => {
    const images = screen.getAllByRole("img");
    expect(images.length).toBe(2);
  });

  test("Cart contains two inputs", () => {
    const inputs = screen.getAllByRole("spinbutton");
    expect(inputs.length).toBe(2);
  });

  test("Cart contains four buttons", () => {
    const buttons = screen.getAllByRole("button", {name: "X"});
    expect(buttons.length).toBe(2);
  });
});

describe("Functionality handling", () => {
  test("Clear button calls correct function", () => {
    const confirmPurchaseButton = screen.getByRole("button", {name: "Confirm purchase"});
    userEvent.click(confirmPurchaseButton);
    userEvent.click(confirmPurchaseButton);
    expect(confirmPurchase).toBeCalledTimes(2);
  });

  test("Contains clear cart button", () => {
    const clearCartButton = screen.getByRole("button", {name: "Clear cart"});
    userEvent.click(clearCartButton);
    userEvent.click(clearCartButton);
    expect(clearCart).toBeCalledTimes(2);
  });

  test("Remove pokemon button calls correct function", () => {
    const removePokemonButtons = screen.getAllByRole("button", {name: "X"});
    const firstRemoveButton = removePokemonButtons[0];
    const secondRemoveButton = removePokemonButtons[1];
    userEvent.click(firstRemoveButton);
    userEvent.click(secondRemoveButton);
    expect(removePokemon).toBeCalledTimes(2);
  });

  test("Input changing calls correct function", () => {
    const amountInputs = screen.getAllByRole("spinbutton");
    const firstAmountInput = amountInputs[0];
    const secondAmountInput = amountInputs[1];
    userEvent.type(firstAmountInput, "222");
    userEvent.type(secondAmountInput, "2");
    expect(handleAmountChange).toBeCalledTimes(4);
  });

  test("Pikachu name contains correct link", () => {
    const pikachuLink = screen.getByText("pikachu");
    expect(pikachuLink).toHaveAttribute("href", "/pokemon/pikachu");
  });

  test("Bulbasaur name contains correct link", () => {
    const pikachuLink = screen.getByText("bulbasaur");
    expect(pikachuLink).toHaveAttribute("href", "/pokemon/bulbasaur");
  });
});
