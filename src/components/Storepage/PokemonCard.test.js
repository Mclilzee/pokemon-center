import React from "react";
import { screen, render, getByText, waitForElementToBeRemoved, findByTestId } from "@testing-library/react";
import "@testing-library/jest-dom";
import PokemonCard from "./PokemonCard";
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

describe("Renders all elements", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation(async () => {
      return Promise.resolve({
        json: () => Promise.resolve(mockPokemon)
      });
    });
  });

  afterEach(() => {
    global.fetch.mockRestore();
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

  afterEach(() => {
    global.fetch.mockRestore();
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

describe("Error loading data", () => {

  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation(async () => {
      return Promise.reject();
    });
  });

  afterEach(() => {
    global.fetch.mockRestore();
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