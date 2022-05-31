import React from "react";
import PokemonCard from "./PokemonCard";
import "./Store.css";
import Page from "./Page";

function Store(props) {

  const [pokemonsArray, setPokemonsArray] = React.useState([]);
  const [pageNumber, setPageNumber] = React.useState(1);

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
    <div className={"store-container"}>
      <div className={"pokemon-cards-container"}>
        {pokemonCards.length > 0 ? pokemonCards : <h1>Loading...</h1>}
      </div>
      <Page pageNumber={pageNumber}/>
    </div>
  );
}

export default Store;