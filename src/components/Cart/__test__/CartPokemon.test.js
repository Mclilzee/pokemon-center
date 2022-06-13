import React from "react";
import { screen, render, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import CartPokemon from "../CartPokemon";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";


function MockCartPokemon(props) {
  return (
    <BrowserRouter>
      <CartPokemon
        name={props.name}
        icon={props.icon}
        amount={props.amount}
        removePokemon={props.removePokemon}
        handleAmountChange={props.handleAmountChange}
      />
    </BrowserRouter>);
}

describe("Basic rendering", () => {

  test("Contains pokemon icon", () => {
    act(() => {
      render(<MockCartPokemon name={"pikachu"} icon={"pikachu.com"}/>);
    });
    const pokemonIcon = screen.getByAltText("pikachu icon");
    expect(pokemonIcon).toHaveAttribute("src", "pikachu.com");
  });

  test("Show placeholder icon if icon was not provided", () => {
    act(() => {
      render(<MockCartPokemon/>);
    });

    const pokemonIcon = screen.getByRole("img");
    expect(pokemonIcon).toHaveAttribute("src", "pokemon-ball.png");
  });

  test("Contains pokemon name", () => {
    act(() => {
      render(<MockCartPokemon name={"bulbasaur"}/>);
    });
    const pokemonName = screen.getByText("bulbasaur");
    expect(pokemonName).toBeInTheDocument();
  });

  test("Pokemon name have correct link", () => {
    act(() => {
      render(<MockCartPokemon name={"bulbasaur"}/>);
    });
    const pokemonName = screen.getByText("bulbasaur");
    expect(pokemonName).toHaveAttribute("href", "/pokemon/bulbasaur");
  });
});

describe("Functionality handling", () => {
  test("Amount Input has correct quantity", () => {
    act(() => {
      render(<MockCartPokemon amount={3}/>);
    });
    const amountInput = screen.getByRole("spinbutton");
    expect(amountInput.value).toBe("3");
  });

  test("Handle amount change called 3 times", () => {
    const handleAmountChange = jest.fn();
    act(() => {
      render(<MockCartPokemon handleAmountChange={handleAmountChange} amount={3}/>);
    });
    const amountInput = screen.getByRole("spinbutton");
    userEvent.type(amountInput, "999");
    expect(handleAmountChange).toBeCalledTimes(3);
  });

  test("Remove button in document", () => {
    act(() => {
      render(<MockCartPokemon/>);
    });

    const removeButton = screen.getByRole("button", {name: "X"});
    expect(removeButton).toBeInTheDocument();
  });

  test("Remove button calls correct function", () => {
    const handleRemoveClick = jest.fn();
    act(() => {
      render(<MockCartPokemon removePokemon={handleRemoveClick}/>);
    });

    const removeButton = screen.getByRole("button", {name: "X"});
    userEvent.click(removeButton);
    userEvent.click(removeButton);
    expect(handleRemoveClick).toBeCalledTimes(2);
  });

});