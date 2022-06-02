import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pokemon from "./Pokemon";
import pokemon from "./Pokemon";
import { act } from "react-dom/test-utils";

describe("Includes all render elements", () => {
  test("Renders correctly", () => {
  });

  beforeEach(() => {
    act(() => {
        render(
          <Pokemon
            name={"bulbasaur"}
            type={"grass / poison"}
            img={"mockImageURL"}
          />
        );
      }
    );
  });

  test("Pokemon name on screen", () => {
    const pokemonName = screen.getByText("bulbasaur");
    expect(pokemonName).toBeInTheDocument();
  });

  test("Pokemon type on screen", () => {
    const pokemonType = screen.getByTestId("type-test");
    expect(pokemonType).toBeInTheDocument();
  });

  test("Pokemon display correct type", () => {
    const pokemonType = screen.getByTestId("type-test");
    expect(pokemonType.textContent).toBe("grass / poison");
  });

  test("Pokemon image display correctly", () => {
    const pokemonImage = screen.getByAltText("bulbasaur");
    expect(pokemonImage).toBeInTheDocument();
  });

});

test("Test for placeholder image", () => {

  render(
    <Pokemon
      name={"bulbasaur"}
      type={["grass", "poison"]}
      img={null}
    />
  );

  const pokmeonImage = screen.getByAltText("bulbasaur");
  expect(pokmeonImage.src).toMatch(/pokemon-ball.png$/);
});

