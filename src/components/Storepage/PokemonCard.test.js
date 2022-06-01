import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import PokemonCard from "./PokemonCard";


window.fetch = jest.fn(() => {

  const pokemon = {
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
          "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
        }
      }
    }
  };

  return Promise.resolve({
    json: () => Promise.resolve(pokemon)
  });
});

describe("Renders all elements", () => {
  test("Renders correctly", async () => {
    render(<PokemonCard url={"mockURL"}/>);
  });
});