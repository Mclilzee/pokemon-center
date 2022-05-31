import React from "react";
import PokemonCard from "./PokemonCard";
import "./Store.css";

function Store(props) {

  const [pokemonsArray, setPokemonsArray] = React.useState([]);

  React.useEffect(() => {
    getPokemons();
  }, []);


  async function getPokemons() {
    const pokemonsData = await fetch("https://pokeapi.co/api/v2/pokemon");
    const pokemons = await pokemonsData.json();
    setPokemonsArray(pokemons.results);
  }

  const pokemonCards = pokemonsArray.map(pokemon => {
    return (
      <PokemonCard
        key={pokemon.name}
        url={pokemon.url}
      />
    );
  });

  return (
    <div className={"pokemon-cards-container"}>
      {pokemonCards.length > 0 ? pokemonCards : <h1>Loading...</h1>}
    </div>
  );
}

export default Store;