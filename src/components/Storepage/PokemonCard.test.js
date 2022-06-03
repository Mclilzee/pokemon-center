import React from "react";
import { screen, render, getByText, waitForElementToBeRemoved, findByTestId } from "@testing-library/react";
import "@testing-library/jest-dom";
import PokemonCard from "./PokemonCard";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

const mockPokemon = {
  name: "bublasaur",
  types: [
    {
      type: {
        name: "grass"
      }
    },
    {
      type: {
        name: "poison"
      }
    }
  ],
  sprites: {
    other: {
      "official-artwork": {
        "front_default": "mockImage.png"
      }
    }
  }
};

afterEach(() => {
  global.fetch.mockRestore();
});

describe("Renders all elements", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation(async () => {
      return Promise.resolve({
        json: () => Promise.resolve(mockPokemon)
      });
    });
  });

  test("Renders correctly", async () => {
    await act(async () => {
      render(<PokemonCard url={"mockURL"}/>);
    });
  });

  test("Contains pokemon image", async () => {
    await act(async () => {
      render(<PokemonCard url={"mockURL"}/>);
    });

    const pokemonImage = await screen.findByAltText("Bublasaur");
    expect(pokemonImage).toBeInTheDocument();
  });

  test("Contains pokemon name", async () => {
    await act(async () => {
      render(<PokemonCard url={"mockURL"}/>);
    });

    const pokemonName = await screen.findByText("Bublasaur");
    expect(pokemonName).toBeInTheDocument();
  });

  test("Contains pokemon type", async () => {
    await act(async () => {
      render(<PokemonCard url={"mockURL"}/>);
    });

    const pokemonType = await screen.findByText("grass / poison");
    expect(pokemonType).toBeInTheDocument();
  });

  test("Contains details button", async () => {
    await act(async () => {
      render(<PokemonCard url={"mockURL"}/>);
    });

    const detailsButton = screen.getByRole("button", {name: "Details"});
    expect(detailsButton).toBeInTheDocument();
  });

  test("Contains add to cart button", async () => {
    await act(async () => {
      render(<PokemonCard url={"mockURL"}/>);
    });

    const addToCartButton = screen.getByRole("button", {name: "Add to Cart"});
    expect(addToCartButton).toBeInTheDocument();
  });

});

describe("Test loading message", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation(async () => {
      return Promise.resolve({
        json: () => Promise.resolve(mockPokemon)
      });
    });
  });

  test("Loading message shows", () => {
    act(() => {
      render(<PokemonCard url={"mockURL"}/>);
    });

    const loadingMessage = screen.getByText("Loading...");
    expect(loadingMessage).toBeInTheDocument();
  });

  test("Loading message gone when information loaded", async () => {
    await act(() => {
      render(<PokemonCard url={"mockURL"}/>);
    });

    const loadingMessage = screen.queryByText("Loading...");
    expect(loadingMessage).not.toBeInTheDocument();
  });
});

describe("Show Error loading data message on fetch failure", () => {

  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation(async () => {
      return Promise.reject();
    });
  });

  test("Show error message", async () => {
    await act(async () => {
      render(<PokemonCard url={"mockURL"}/>);
    });

    const errorMessage = await screen.findByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
  });

  test("Don't display buttons on error", async () => {
    await act(async () => {
      render(<PokemonCard url={"mockURL"}/>);
    });

    const container = await screen.findByTestId("card-test");
    expect(container.children.length).toBe(1);
  });
});

describe("User input functionality", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation(async () => {
      return Promise.resolve({
        json: () => Promise.resolve(mockPokemon)
      });
    });
  });

  test("Submit function called", async () => {
    const mockSubmit = jest.fn();
    await act(async () => {
      render(<PokemonCard handleSubmit={mockSubmit}/>);
    });

    const submitButton = screen.getByRole("button", {name: "Add to Cart"});

    userEvent.click(submitButton);
    userEvent.click(submitButton);
    expect(mockSubmit).toBeCalledTimes(2);
  });

  test("Details function called", async () => {
    await act(async () => {
      render(<PokemonCard/>);
    });

    const detailsButton = screen.getByRole("button", {name: "Details"});

    userEvent.click(detailsButton);
    userEvent.click(detailsButton);
    // TODO
  });

  test("Change input the right amount", async () => {
    await act(async () => {
      render(<PokemonCard/>);
    });

    const inputField = screen.getByDisplayValue("1");
    userEvent.clear(inputField);
    userEvent.type(inputField, "2");
    expect(inputField.value).toBe("2");
  });

  test("Input max limit", async () => {
    await act(async () => {
      render(<PokemonCard/>);
    });

    const inputField = screen.getByDisplayValue("1");
    userEvent.type(inputField, "9999");
    expect(inputField.value).toBe("100");
  });

  test("Input min limit", async () => {
    await act(async () => {
      render(<PokemonCard/>);
    });

    const inputField = screen.getByDisplayValue("1");
    userEvent.type(inputField, "-20");
    expect(inputField.value).toBe("1");
  });

  test("Input can't be empty", async () => {
    await act(async () => {
      render(<PokemonCard/>);
    });

    const inputField = screen.getByDisplayValue("1");
    userEvent.clear(inputField);
    expect(inputField.value).toBe("1");
  });
});