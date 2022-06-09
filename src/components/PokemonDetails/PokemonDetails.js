import React from "react";
import "./PokemonDetails.css";
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
    return (
      <Stat key={item.stat.name}
            className={props.className}
            name={capitalize(item.stat.name)}
            number={item.base_stat}
      />
    );
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
        <h1 className={"pokemon-name"}>{capitalize(pokemon.name)}</h1>
        <img className={"pokemon-front-image"} src={imageLink} alt={pokemon.name + " artwork"}/>
        <PokemonHistory url={pokemon.species.url}/>
      </div>
      <div className={"pokemon-details"}>
        <img className={"pokemon-game-icon"} src={pokemon.sprites.back_default} alt={pokemon.name + " game icon"}/>
        <ul className={"types-container"}>
          <h4>Types</h4>
          {types}
        </ul>
        <ul className={"stats-container"}>
          <h4>Stats</h4>
          {stats}
        </ul>
        <ul className={"abilities-container"}>
          <h4>Abilities</h4>
          {abilities}
        </ul>
        <p className={"pokemon-height"}>Height: {generateHeightString()}</p>
        <p className={"pokemon-weight"}>Weight: {generateWeightString()}</p>
      </div>
    </div>
  );

}

export default PokemonDetails;