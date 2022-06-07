import React from "react";
import { capitalize } from "../../helperFunctions";
import NotFoundError from "../NotFoundError/NotFoundError";
import { useParams } from "react-router-dom";
import Ability from "./Ability";
import Type from "./Type";
import Stat from "./Stat";

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

  if (error !== null) {
    if (error instanceof SyntaxError) {
      return <NotFoundError/>;
    } else {
      return <h1>Error loading the page, check your internet connection, or refresh.</h1>;
    }
  }

  if (pokemon === null) {
    return <h1>Loading...</h1>;
  }

  const stats = pokemon.stats.map(item => {
    return <Stat name={capitalize(item.stat.name)} number={item.base_stat}/>;
  });

  const abilities = pokemon.abilities.map(item => {
    return <Ability name={capitalize(item.ability.name)} key={item.ability.url} hidden={item.is_hidden}/>;
  });

  const types = pokemon.types.map(item => {
    return <Type name={item.type.name} key={item.type.name}/>;
  });

  return (
    <div className={"pokemon-container"}>
      <h1>{capitalize(pokemon.name)}</h1>
      <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name}/>
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
    </div>
  );

}

export default PokemonDetails;