import React from "react";

function PokemonCard(props) {

  const [pokemon, setPokemon] = React.useState(null);
  const [amount, setAmount] = React.useState(1);

  React.useEffect(() => {
    async function getPokemonDetails() {
      const data = await fetch(props.url);
      const item = await data.json();
      setPokemon(item);
    }

    getPokemonDetails();
  }, []);


  function capitalize(text) {
    if (text.length < 1) {
      return;
    }

    return text[0].toUpperCase() + text.slice(1);
  }

  function generateTypeString() {
    let typeArray = [];

    for (let type of pokemon.types) {
      typeArray.push(type.type.name);
    }

    return typeArray.join(" / ");
  }

  function changeAmount(e) {
    let result = e.target.value;
    if (result < 1) {
      result = 1;
    }

    setAmount(result);
  }

  function loadPokemon() {
    if (pokemon === null) {
      return <h1>Loading...</h1>;
    }

    return (
      <>
        <img className={"pokemon-image"} src={pokemon.sprites.other["official-artwork"]["front_default"]}
             alt={`${pokemon.name}`}/>
        <h2 className={"pokemon-name"}>{capitalize(pokemon.name)}</h2>
        <h4 className={"pokemon-type"}>{generateTypeString()}</h4>
        <button className={"details-button"}>Details</button>
        <input className={"amount-input"} onChange={changeAmount} type={"number"} value={amount}/>
        <button className={"add-button"}>Add {amount} to Cart</button>
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