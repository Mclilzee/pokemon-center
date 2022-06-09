import React from "react";
import { capitalize } from "../../helperFunctions";
import NotFoundError from "../NotFoundError/NotFoundError";
import { useParams } from "react-router-dom";
import Ability from "./Ability";
import Type from "./Type";
import Stat from "./Stat";
import PokemonHistory from "./PokemonHistory";

function PokemonDetails(props) {
  const [pokemon, setPokemon] = React.useState(null);
  const [error, setError] = React.useState(null);
  const {pokemonName} = useParams();

  React.useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const item = await data.json();
        setPokemon(item);
      } catch (e) {
        setError(e);
      }
    }

    fetchData();
  }, [pokemonName]);

  function generateWeightString() {
    const weightInKilo = pokemon.weight / 10;
    if (weightInKilo < 1) {
      return weightInKilo * 1000 + "g";
    }

    return weightInKilo + "kg";
  }

  function generateHeightString() {
    const heightInMeter = pokemon.height / 10;
    if (heightInMeter < 1) {
      return heightInMeter * 100 + "cm";
    }

    return heightInMeter + "m";
  }

  if (error !== null) {
    if (error instanceof SyntaxError) {
      return <NotFoundError/>;
    } else {
      return <h1 data-testid={"error-test"}>Error loading the page, check your internet connection, or refresh.</h1>;
    }
  }

  if (pokemon === null) {
    return <h1>Loading...</h1>;
  }

  const stats = pokemon.stats.map(item => {
    return <Stat key={item.stat.name} name={capitalize(item.stat.name)} number={item.base_stat}/>;
  });

  const abilities = pokemon.abilities.map(item => {
    return <Ability name={capitalize(item.ability.name)} key={item.ability.name} hidden={item.is_hidden}/>;
  });

  const types = pokemon.types.map(item => {
    return <Type name={item.type.name} key={item.type.name}/>;
  });

  const imageLink = pokemon.sprites.other["official-artwork"].front_default ?
    pokemon.sprites.other["official-artwork"].front_default : "../assets/images/pokemon-ball.png";

  return (
    <div data-testid={"pokemon-container-test"} className={"pokemon-container"}>
      <div className={"pokemon-view"}>
        <h1>{capitalize(pokemon.name)}</h1>
        <img src={imageLink} alt={pokemon.name + " artwork"}/>
        <PokemonHistory url={pokemon.species.url}/>
      </div>
      <img src={pokemon.sprites.back_default} alt={pokemon.name + " game icon"}/>
      <ul>
        {stats}
      </ul>
      <ul className={"ability-container"}>
        {abilities}
      </ul>
      <ul className={"type-container"}>
        {types}
      </ul>
      <p className={"height"}>Height: {generateHeightString()}</p>
      <p className={"weight"}>Weight: {generateWeightString()}</p>
    </div>
  );

}

export default PokemonDetails;