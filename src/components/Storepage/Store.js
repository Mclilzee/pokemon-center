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
  const [errorMessage, setErrorMessage] = React.useState(null);

  React.useEffect(() => {
    async function fetchPokemons() {
      try {
        const pokemonData = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
        const pokemonItems = await pokemonData.json();
        setPokemonsDB(pokemonItems.results);
      } catch {
        setErrorMessage("Error Loading Data, Check internet connection or try again later.");
      }
    }

    fetchPokemons();
  }, []);

  React.useEffect(() => {
    if (foundPokemons.length === 0) {
      setMaxPageNumber(1);
      setPageNumber(0);
      return;
    }
    setMaxPageNumber(Math.ceil(foundPokemons.length / 20));
  }, [foundPokemons]);

  React.useEffect(() => {
    if (pageNumber === 0) {
      return;
    }

    const offset = (pageNumber - 1) * 20;
    const limit = offset + 20;
    setPokemonsArraySlice(foundPokemons.slice(offset, limit));
  }, [pageNumber, foundPokemons]);

  React.useEffect(() => {
    let found = [];
    const pattern = new RegExp(searchText, 'i');

    for (let pokemon of pokemonsDB) {
      if (pokemon.name.match(pattern)) {
        found.push(pokemon);
      }
    }

    setFoundPokemons(found);
    setPageNumber(1);
  }, [searchText, pokemonsDB]);

  function newPageNumber(pageNumber) {
    setPageNumber(pageNumber);
  }

  function onChangeSearchText(e) {
    setSearchText(e.target.value);
  }

  const pokemonCards = pokemonsArraySlice.map(pokemon => {
    return (
      <PokemonCard
        key={pokemon.name}
        name={pokemon.name}
        url={pokemon.url}
        handleSubmit={props.handleSubmit}
      />
    );
  });

  function generateLoadingMessage() {
    if (searchText.length === 0) {
      return <h1 className={"loading"}>Loading...</h1>;
    } else {
      return <h1 className={"loading"}>Not Found :(</h1>;

    }
  }

  if (errorMessage !== null) {
    return <h1 data-testid={"error-message"}>{errorMessage}</h1>;
  }

  return (
    <div className={"store-container"}>
      <input placeholder={"Search Pokemon Name"} onChange={onChangeSearchText} type={"text"} value={searchText}/>
      <div className={"pokemon-cards-container"}>
        {pokemonCards.length > 0 ? pokemonCards : generateLoadingMessage()}
      </div>
      <Page newPageNumber={newPageNumber} pageNumber={pageNumber} maxPageNumber={maxPageNumber}/>
    </div>
  );
}

export default Store;