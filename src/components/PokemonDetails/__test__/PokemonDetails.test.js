import React from "react";
import { act, screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import PokemonDetails from "../PokemonDetails";

const mockPokemon = {
  name: "pikachu",
  height: 4,
  weight: 60,
  species: {
    url: "species.com"
  },
  abilities: [
    {
      ability: {
        name: "static"
      },
      is_hidden: false
    },
    {
      ability: {
        name: "lightning-rod"
      },
      is_hidden: true
    }
  ],
  types: [
    {
      type: {
        name: "electric"
      }
    },
    {
      type: {
        name: "normal"
      }
    }
  ],
  sprites: {
    other: {
      ["official-artwork"]: {
        front_default: "image.com"
      }
    },
    back_default: "icon.com"
  },
  stats: [
    {
      base_stat: 35,
      stat: {
        name: "hp"
      }
    },
    {
      base_stat: 55,
      stat: {
        name: "attack"
      }
    },
    {
      base_stat: 40,
      stat: {
        name: "defense"
      }
    },
    {
      base_stat: 50,
      stat: {
        name: "special-attack"
      }
    },
    {
      base_stat: 50,
      stat: {
        name: "special-defense"
      }
    },
    {
      base_stat: 90,
      stat: {
        name: "speed"
      }
    }
  ]
};

jest.mock("../PokemonHistory", () => (props) => {
  return (
    <div className={"pokemon-history"}>
      <h2>Obviously prefers hot places.</h2>
      <h3 data-testid={"habitat-test"} className={"habitat-message"}>Habitat : Sea</h3>
      <h3 data-testid={"evolve-test"}>Evolves from : Bulbasaur</h3>
    </div>
  );
});

beforeEach(() => {
  jest.spyOn(global, "fetch").mockImplementation(() => {
    return Promise.resolve({
      json: () => Promise.resolve(mockPokemon)
    });
  });
});

describe("Rendering basics", () => {
  test("Renders", async () => {
    await act(async () => {
      render(<PokemonDetails/>);
    });
  });

  test("Show pokemon name capitalized", async () => {
    await act(async () => {
      render(<PokemonDetails/>);
    });

    const pokemonName = await screen.findByRole("heading", {name: "Pikachu"});
    expect(pokemonName).toBeInTheDocument();
  });

  test("Show pokemon flavor text", async () => {
    await act(async () => {
      render(<PokemonDetails/>);
    });

    const flavorText = await screen.findByText("Obviously prefers hot places.");
    expect(flavorText).toBeInTheDocument();
  });

  test("Show pokemon habitat text", async () => {
    await act(async () => {
      render(<PokemonDetails/>);
    });

    const habitatText = await screen.findByTestId("habitat-test");
    expect(habitatText).toBeInTheDocument();
  });

  test("Show pokemon evolve text", async () => {
    await act(async () => {
      render(<PokemonDetails/>);
    });

    const evolveText = await screen.findByTestId("evolve-test");
    expect(evolveText).toBeInTheDocument();
  });
});

describe("Image rendering", () => {
  test("Show pokemon image", async () => {
    await act(async () => {
      render(<PokemonDetails/>);
    });

    const image = await screen.findByAltText("pikachu artwork");
    expect(image).toBeInTheDocument();
  });

  test("Pokemon image has correct src", async () => {
    await act(async () => {
      render(<PokemonDetails/>);
    });

    const image = await screen.findByAltText("pikachu artwork");
    expect(image).toHaveAttribute("src", "image.com");
  });

  test("Pokemon image placeholder show when there is no image", async () => {
    // change object's front_default to null
    const alteredMockPokemon = {
      ...mockPokemon, sprites: {
        back_default: "icon.com",
        other: {
          ["official-artwork"]: {
            front_default: null
          }
        }
      }
    };
    jest.spyOn(global, "fetch").mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(alteredMockPokemon)
      });
    });

    await act(async () => {
      render(<PokemonDetails/>);
    });

    const image = await screen.findByAltText("pikachu artwork");
    expect(image).toHaveAttribute("src", "../assets/images/pokemon-ball.png");
  });

  test("Show game icon", async () => {
    await act(async () => {
      render(<PokemonDetails/>);
    });

    const gameIcon = await screen.findByAltText("pikachu game icon");
    expect(gameIcon).toBeInTheDocument();
  });

  test("Game icon has correct src", async () => {
    await act(async () => {
      render(<PokemonDetails/>);
    });

    const gameIcon = await screen.findByAltText("pikachu game icon");
    expect(gameIcon).toHaveAttribute("src", "icon.com");
  });
});

describe("Stats rendering", () => {
  test("Pokemon has hp stat", async () => {
    await act(async () => {
      render(<PokemonDetails/>);
    });

    const hpStat = await screen.findByText("Hp : 35");
    expect(hpStat).toBeInTheDocument();
  });

  test("Pokemon has attack stat", async () => {
    await act(async () => {
      render(<PokemonDetails/>);
    });

    const attackStat = await screen.findByText("Attack : 55");
    expect(attackStat).toBeInTheDocument();
  });

  test("Pokemon has defense stat", async () => {
    await act(async () => {
      render(<PokemonDetails/>);
    });

    const defenseStat = await screen.findByText("Defense : 40");
    expect(defenseStat).toBeInTheDocument();
  });

  test("Pokemon has special-attack stat", async () => {
    await act(async () => {
      render(<PokemonDetails/>);
    });

    const specialAttackStat = await screen.findByText("Special-attack : 50");
    expect(specialAttackStat).toBeInTheDocument();
  });

  test("Pokemon has special-defense stat", async () => {
    await act(async () => {
      render(<PokemonDetails/>);
    });

    const specialDefenseStat = await screen.findByText("Special-defense : 50");
    expect(specialDefenseStat).toBeInTheDocument();
  });

  test("Pokemon has speed stat", async () => {
    await act(async () => {
      render(<PokemonDetails/>);
    });

    const speedStat = await screen.findByText("Speed : 90");
    expect(speedStat).toBeInTheDocument();
  });
});

describe("Abilities rendering", () => {
  test("Pokemon has static ability", async () => {
    await act(async () => {
      render(<PokemonDetails/>);
    });

    const staticAbility = await screen.findByText("Static");
    expect(staticAbility).toBeInTheDocument();
  });

  test("Static ability has no hidden text", async () => {
    await act(async () => {
      render(<PokemonDetails/>);
    });

    const staticAbility = await screen.findByText("Static");
    expect(staticAbility).not.toHaveTextContent(/\( hidden \)/);
  });

  test("Pokemon has Lightning-rod ability", async () => {
    await act(async () => {
      render(<PokemonDetails/>);
    });

    const lightningRodAbility = await screen.findByText("Lightning-rod");
    expect(lightningRodAbility).toBeInTheDocument();
  });

  test("Lightning-rod ability has hidden text", async () => {
    await act(async () => {
      render(<PokemonDetails/>);
    });

    const lightningRodAbility = await screen.findByText("Lightning-rod");
    expect(lightningRodAbility).toHaveTextContent(/\( hidden \)/);
  });
});