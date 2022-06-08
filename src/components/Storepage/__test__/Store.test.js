import React from "react";
import { screen, render, act, waitForElementToBeRemoved } from "@testing-library/react";
import "@testing-library/jest-dom";
import Store from "../Store";
import userEvent from "@testing-library/user-event";

const mockArray = [
  {
    name: "bulbasaur",
    url: "bulbasaur.com"
  },
  {
    name: "squirtle",
    url: "squirtle.com"
  },
  {
    name: "charizard",
    url: "charizard.com"
  }
];

beforeEach(() => {
  jest.spyOn(global, "fetch").mockImplementation(async () => {
    return Promise.resolve({
      json: () => Promise.resolve({results: mockArray})
    });
  });
});

jest.mock("../PokemonCard", () => (props) => {
  return <h1 data-testid={"pokemon-card"}>{props.url}</h1>;
});

jest.mock("../Page", () => (props) => {
  return <h1 data-testid={"page-test"}>{props.pageNumber}</h1>;
});

describe("Rendering basics", () => {
  test("Component renders", async () => {
    await act(async () => {
      render(<Store/>);
    });
  });

  test("Input field render after loading", async () => {
    await act(async () => {
      render(<Store/>);
    });

    const inputField = await screen.findByPlaceholderText("Search Pokemon Name");
    expect(inputField).toBeInTheDocument();
  });

  test("input field renders during loading", () => {
    act(() => {
      render(<Store/>);
    });

    const inputField = screen.getByPlaceholderText("Search Pokemon Name");
    expect(inputField).toBeInTheDocument();
    waitForElementToBeRemoved(() => screen.getByText("Loading..."));
  });

  test("Pokemon Cards loaded", async () => {
    await act(async () => {
      render(<Store/>);
    });

    const pokemonCards = await screen.findAllByTestId("pokemon-card");
    expect(pokemonCards.length).toBe(3);
  });

  test("Pokemon URL passed to Pokemon Cards", async () => {
    await act(async () => {
      render(<Store/>);
    });

    const pokemonCardURLs = await screen.findAllByText(/.com$/i);
    expect(pokemonCardURLs.length).toBe(3);
  });

  test("Expect page number to be correct", async () => {
    await act(async () => {
      render(<Store/>);
    });

    const pageNumber = await screen.findByTestId("page-test");
    expect(pageNumber.textContent).toBe("1");
  });

});

describe("Test functionality", () => {
  test("Input field changes", async () => {
    await act(async () => {
      render(<Store/>);
    });

    const inputField = await screen.findByPlaceholderText("Search Pokemon Name");
    userEvent.type(inputField, "pikachu");
    expect(inputField.value).toBe("pikachu");
  });

  test("Show appropriate number of pokemons on search", async () => {
    await act(async () => {
      render(<Store/>);
    });

    const inputField = await screen.findByPlaceholderText("Search Pokemon Name");
    userEvent.type(inputField, "l");

    const pokemonCards = await screen.findAllByTestId("pokemon-card");
    expect(pokemonCards.length).toBe(2);
  });

  test("Show the right pokemon fetch URL on search", async () => {
    await act(async () => {
      render(<Store/>);
    });

    const inputField = await screen.findByPlaceholderText("Search Pokemon Name");
    userEvent.type(inputField, "char");

    const pokemonURL = await screen.findByTestId("pokemon-card");
    expect(pokemonURL.textContent).toBe("charizard.com");
  });
});

describe("Loading handling", () => {
  // test("Loading message rendered while fetching", () => {
  //   act(() => {
  //     render(<Store/>);
  //   });
  //
  //   const loadingMessage = screen.getByText("Loading...");
  //   expect(loadingMessage).toBeInTheDocument();
  // });

  test("Loading message removed after fetching", () => {
    act(() => {
      render(<Store/>);
    });

    waitForElementToBeRemoved(() => screen.getByText("Loading..."));
  });
});

describe("Error handling", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation(async () => {
      return Promise.reject();
    });
  });

  test("Show error message on fetch failure", async () => {
    await act(async () => {
      render(<Store/>);
    });

    const errorMessage = await screen.findByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
  });

  test("Do not show input field on error", async () => {
    await act(async () => {
      render(<Store/>);
    });

    const inputField = screen.queryByPlaceholderText("Search Pokemon Name");
    expect(inputField).not.toBeInTheDocument();
  });

  test("Do not show pokemon cards on error", async () => {
    await act(async () => {
      render(<Store/>);
    });

    const pokemonCards = screen.queryAllByTestId("pokemon-card");
    expect(pokemonCards.length).toBe(0);
  });

  test("Do not show page number on error", async () => {
    await act(async () => {
      render(<Store/>);
    });

    const pageNumber = screen.queryByTestId("page-test");
    expect(pageNumber).not.toBeInTheDocument();
  });
});