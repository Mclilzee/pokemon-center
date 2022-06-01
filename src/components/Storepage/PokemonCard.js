import React from "react";
import Pokemon from "./Pokemon";

function PokemonCard(props) {

  const [pokemon, setPokemon] = React.useState(null);
  const [amount, setAmount] = React.useState(1);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function getPokemonDetails() {
      try {
        const data = await fetch(props.url);
        const item = await data.json();
        setPokemon(item);
      } catch {
        setError("Error loading information");
      }
    }

    getPokemonDetails();
  }, [props.url]);

  function generateTypeString() {
    let typeArray = [];

    for (let type of pokemon.types) {
      typeArray.push(type.type.name);
    }

    return typeArray.join(" / ");
  }

  function capitalizeName() {
    if (pokemon.name.length < 1) {
      return;
    }

    return pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  }

  function changeAmount(e) {
    let result = e.target.value;
    if (result < 1) {
      result = 1;
    } else if (result > 100) {
      result = 100;
    }

    setAmount(result);
  }

  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className={"pokemon-card"}>
      {pokemon ? <Pokemon name={capitalizeName()} type={generateTypeString()}
                          img={pokemon.sprites.other["official-artwork"]["front_default"]}/> : <h1>{error}</h1>}
      <button className={"details-button"}>Details</button>
      <form onSubmit={onSubmit} className={"add-form"}>
        <button className={"add-button"}>Add to Cart</button>
        <input min={1} max={100} className={"add-input"} onChange={changeAmount} type={"number"} value={amount}/>
      </form>
    </div>


  );
}

export default PokemonCard;