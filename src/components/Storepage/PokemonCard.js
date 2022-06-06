import React from "react";
import Pokemon from "./Pokemon";
import { Link } from "react-router-dom";

function PokemonCard(props) {

  const [pokemon, setPokemon] = React.useState(null);
  const [amount, setAmount] = React.useState(1);
  const [errorMessage, setErrorMessage] = React.useState(null);

  React.useEffect(() => {
    async function getPokemonDetails() {
      try {
        const data = await fetch(props.url);
        const item = await data.json();
        setPokemon(item);
      } catch {
        setErrorMessage("Error loading information");
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

  function handleSubmit(e) {
    e.preventDefault();
    props.handleSubmit(pokemon.name, amount);
  }

  if (errorMessage !== null) {
    return <h1 data-testid={"error-message"}>{errorMessage}</h1>;
  }

  if (pokemon === null) {
    return <h1>Loading...</h1>;
  }

  return (
    <div data-testid="card-test" className={"pokemon-card"}>
      <Pokemon
        name={capitalizeName()}
        type={generateTypeString()}
        img={pokemon.sprites.other["official-artwork"]["front_default"]}
      />
      <Link to={"/pokemon/" + props.name}>
        <button className={"details-button"}>Details</button>
      </Link>
      <form onSubmit={handleSubmit} className={"add-form"}>
        <button className={"add-button"}>Add to Cart</button>
        <input min={1} max={100} className={"add-input"} onChange={changeAmount} type={"number"} value={amount}/>
      </form>
    </div>
  );
}

export default PokemonCard;