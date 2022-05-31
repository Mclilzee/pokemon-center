import React from "react";

function PokemonCard(props) {

  const [pokemon, setPokemon] = React.useState(null);

  React.useEffect(() => {
    getPokemonDetails();
  }, []);

  async function getPokemonDetails() {
    const data = await fetch(props.url);
    const item = await data.json();
    setPokemon(item);
  }

  function capitalize(text) {
    if (text.length < 1) {
      return;
    }

    return text[0].toUpperCase() + text.slice(1);
  }

  function loadPokemon() {
    if (pokemon === null) {
      return <h1>Loading...</h1>;
    }

    return (
      <>
        <img src={pokemon.sprites.other["official-artwork"]["front_default"]} alt={`Image of ${pokemon.name}`}/>
        <h2>{capitalize(pokemon.name)}</h2>
      </>
    );
  }


  return (
    <div className={"pokemon-card"}>
      {loadPokemon()}
    </div>


  );
}

export default PokemonCard;