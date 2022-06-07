import React from "react";
import { act, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import "@testing-library/jest-dom";
import PokemonHistory from "../PokemonHistory";
import { BrowserRouter } from "react-router-dom";

const pokemonHistory = {
  evolves_from_species: {
    name: "ivysaur",
    url: "ivysaur.com"
  },
  flavor_text_entries: [
    {
      flavor_text: "The plant blooms."
    }
  ],
  habitat: {
    name: "grassland"
  }
};

function MockHistory() {
  return (
    <BrowserRouter>
      <PokemonHistory/>
    </BrowserRouter>
  );
}

beforeEach(() => {
  jest.spyOn(global, "fetch").mockImplementation(() => {
    return Promise.resolve({
      json: () => Promise.resolve(pokemonHistory)
    });
  });
});

describe("Basic rendering", () => {
  test("Renders correctly", async () => {
    await act(() => {
      render(<MockHistory/>);
    });
  });

  test("Flavor message to be in document", async () => {
    await act(() => {
      render(<MockHistory/>);
    });

    const flavorMessage = screen.getByText("The plant blooms.");
    expect(flavorMessage).toBeInTheDocument();
  });

  test("Habitat message to be in document", async () => {
    await act(() => {
      render(<MockHistory/>);
    });

    const habitatMessage = screen.getByText(/grassland/i);
    expect(habitatMessage).toBeInTheDocument();
  });

  test("Evolves message to be in document", async () => {
    await act(() => {
      render(<MockHistory/>);
    });

    const evolvesMessage = screen.getByText(/ivysaur/i);
    expect(evolvesMessage).toBeInTheDocument();
  });

  test("Loading message to show while fetching data", () => {
    act(() => {
      render(<MockHistory/>);
    });

    const loadingMessage = screen.getByText("Loading...");
    expect(loadingMessage).toBeInTheDocument();
    waitForElementToBeRemoved(() => screen.getByText("Loading..."));
  });

  test("There is no link if no evolution happend", async () => {
    const alteredHistory = {...pokemonHistory, evolves_from_species: null};
    jest.spyOn(global, "fetch").mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(alteredHistory)
      });
    });

    await act(() => {
      render(<MockHistory/>);
    });

    const linkElement = screen.queryByRole("link");
    expect(linkElement).not.toBeInTheDocument();
  });

  test("Show none if there was no evolution", async () => {
    const alteredHistory = {...pokemonHistory, evolves_from_species: null};
    jest.spyOn(global, "fetch").mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(alteredHistory)
      });
    });

    await act(() => {
      render(<MockHistory/>);
    });

    const linkElement = screen.getByTestId("evolution-test");
    expect(linkElement.textContent).toMatch(/none/i);
  });
});

describe("Test error handling situation", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation(() => {
      return Promise.reject();
    });
  });

  test("Error message shown on promise reject", async () => {
    await act(() => {
      render(<MockHistory/>);
    });

    const errorElement = await screen.findByTestId("error-message");
    expect(errorElement).toBeInTheDocument();
  });
});
