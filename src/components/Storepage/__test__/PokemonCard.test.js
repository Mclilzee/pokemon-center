import React from "react";
import { screen, render, waitForElementToBeRemoved, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import PokemonCard from "../PokemonCard";
import userEvent from "@testing-library/user-event";
import Store from "../Store";
import { BrowserRouter } from "react-router-dom";

function MockPokemonCard(props) {
  return (
    <BrowserRouter>
      <PokemonCard url={props.url} handleSubmit={props.handleSubmit}/>
    </BrowserRouter>
  );
}

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

beforeEach(() => {
  jest.spyOn(global, "fetch").mockImplementation(async () => {
    return Promise.resolve({
      json: () => Promise.resolve(mockPokemon)
    });
  });
});

describe("Renders all elements", () => {

  test("Renders correctly", async () => {
    await act(() => {
      render(<MockPokemonCard url={"mockURL"}/>);
    });
  });

  test("Contains pokemon image", async () => {
    await act(() => {
      render(<MockPokemonCard url={"mockURL"}/>);
    });

    const pokemonImage = await screen.findByAltText("Bublasaur");
    expect(pokemonImage).toBeInTheDocument();
  });

  test("Contains pokemon name", async () => {
    await act(() => {
      render(<MockPokemonCard url={"mockURL"}/>);
    });

    const pokemonName = await screen.findByText("Bublasaur");
    expect(pokemonName).toBeInTheDocument();
  });

  test("Contains pokemon type", async () => {
    await act(async () => {
      render(<MockPokemonCard url={"mockURL"}/>);
    });

    const pokemonType = await screen.findByText("grass / poison");
    expect(pokemonType).toBeInTheDocument();
  });

  test("Contains details button", async () => {
    await act(() => {
      render(<MockPokemonCard url={"mockURL"}/>);
    });

    const detailsButton = screen.getByRole("button", {name: "Details"});
    expect(detailsButton).toBeInTheDocument();
  });

  test("Contains add to cart button", async () => {
    await act(() => {
      render(<MockPokemonCard url={"mockURL"}/>);
    });

    const addToCartButton = screen.getByRole("button", {name: "Add to Cart"});
    expect(addToCartButton).toBeInTheDocument();
  });

});

describe("Loading handling", () => {
  test("Loading message rendered while fetching", () => {
    act(() => {
      render(<Store/>);
    });
    const loadingMessage = screen.getByText("Loading...");
    expect(loadingMessage).toBeInTheDocument();
  });

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

  test("Show error message", async () => {
    await act(() => {
      render(<MockPokemonCard url={"mockURL"}/>);
    });

    const errorMessage = await screen.findByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
  });

  test("Don't display buttons on error", async () => {
    await act(() => {
      render(<MockPokemonCard url={"mockURL"}/>);
    });

    const container = await screen.queryByTestId("card-test");
    expect(container).not.toBeInTheDocument();
  });
})
;

describe("User input functionality", () => {

  test("Submit function called", async () => {
    const mockSubmit = jest.fn();
    await act(() => {
      render(<MockPokemonCard handleSubmit={mockSubmit}/>);
    });

    const submitButton = screen.getByRole("button", {name: "Add to Cart"});

    userEvent.click(submitButton);
    userEvent.click(submitButton);
    expect(mockSubmit).toBeCalledTimes(2);
  });

  test("Details function called", async () => {
    await act(() => {
      render(<MockPokemonCard/>);
    });

    const detailsButton = screen.getByRole("button", {name: "Details"});

    userEvent.click(detailsButton);
    userEvent.click(detailsButton);
    // TODO
  });

  test("Change input the right amount", async () => {
    await act(() => {
      render(<MockPokemonCard/>);
    });

    const inputField = screen.getByDisplayValue("1");
    userEvent.clear(inputField);
    userEvent.type(inputField, "2");
    expect(inputField.value).toBe("2");
  });

  test("Input max limit", async () => {
    await act(() => {
      render(<MockPokemonCard/>);
    });

    const inputField = screen.getByDisplayValue("1");
    userEvent.type(inputField, "9999");
    expect(inputField.value).toBe("100");
  });

  test("Input min limit", async () => {
    await act(() => {
      render(<MockPokemonCard/>);
    });

    const inputField = screen.getByDisplayValue("1");
    userEvent.type(inputField, "-20");
    expect(inputField.value).toBe("1");
  });

  test("Input can't be empty", async () => {
    await act(() => {
      render(<MockPokemonCard/>);
    });

    const inputField = screen.getByDisplayValue("1");
    userEvent.clear(inputField);
    expect(inputField.value).toBe("1");
  });
});