import React from "react";
import PokemonCard from "./PokemonCard";
import "./Store.css";
import Page from "./Page";

function Store(props) {

  const [pokemonsDB, setPokemonsDB] = React.useState([]);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [searchText, setSearchText] = React.useState("");
  const [foundPokemons, setFoundPokemons] = React.useState([]);
  const [pokemonsArraySlice, setPokemonsArraySlice] = React.useState([]);
  const [maxPageNumber, setMaxPageNumber] = React.useState(57);

  React.useEffect(() => {
    fetchPokemons();
  }, []);

  React.useEffect(() => {
    setMaxPageNumber(Math.ceil(foundPokemons.length / 20));
  }, [foundPokemons]);

  React.useEffect(() => {
    const offset = (pageNumber - 1) * 20;
    const limit = offset + 20;
    setPokemonsArraySlice(foundPokemons.slice(offset, limit));
  }, [pageNumber, foundPokemons]);

  React.useEffect(() => {
    let found = [];
    const pattern = new RegExp(searchText, 'i');

    if (searchText.length === 0) {
      found = pokemonsDB;

    } else {

      for (let pokemon of pokemonsDB) {
        if (pokemon.name.match(pattern)) {
          found.push(pokemon);
        }
      }
    }

    setFoundPokemons(found);
    setPageNumber(1);
  }, [searchText, pokemonsDB]);

  async function fetchPokemons() {
    const pokemonData = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
    const pokemonItems = await pokemonData.json();
    setPokemonsDB(pokemonItems.results);
  }

  function previousPage() {
    if (pageNumber === 1) {
      return;
    }
    setPageNumber(prevState => prevState - 1);
  }

  function nextPage() {
    if (pageNumber === 57) {
      return;
    }
    setPageNumber(prevState => prevState + 1);
  }

  function onChangeSearchText(e) {
    setSearchText(e.target.value);
  }

  const pokemonCards = pokemonsArraySlice.map(pokemon => {
    return (
      <PokemonCard
        key={pokemon.name}
        url={pokemon.url}
      />
    );
  });

  return (
    <div className={"store-container"}>
      <input placeholder={"Search Pokemon Name"} onChange={onChangeSearchText} type={"text"} value={searchText}/>
      <div className={"pokemon-cards-container"}>
        {pokemonCards.length > 0 ? pokemonCards : <h1 className={"not-found"}>Not Found :(</h1>}
      </div>
      <Page nextPage={nextPage} previousPage={previousPage} pageNumber={pageNumber} maxPageNumber={maxPageNumber}/>
    </div>
  );
}

export default Store;