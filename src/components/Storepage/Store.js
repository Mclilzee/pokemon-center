import React from "react";
import PokemonCard from "./PokemonCard";
import "./Store.css";
import Page from "./Page";

function Store(props) {

  const [pokemonsArray, setPokemonsArray] = React.useState([]);
  const [pageNumber, setPageNumber] = React.useState(1);

  React.useEffect(() => {
    getPokemons();
  }, [pageNumber]);


  async function getPokemons() {
    const offset = (pageNumber - 1) * 20;
    const fetchString = `https://pokeapi.co/api/v2/pokemon?offset=${offset}`;
    const pokemonsData = await fetch(fetchString);
    const pokemons = await pokemonsData.json();
    setPokemonsArray(pokemons.results);
  }

  function previousPage() {
    if (pageNumber === 1) {
      return;
    }
    setPageNumber(prevState => prevState - 1);
  }

  function nextPage() {

    setPageNumber(prevState => prevState + 1);
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
      <Page nextPage={nextPage} previousPage={previousPage} pageNumber={pageNumber}/>
    </div>
  );
}

export default Store;