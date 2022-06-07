import React from "react";
import NotFoundError from "../NotFoundError/NotFoundError";
import { useParams } from "react-router-dom";
import Ability from "./Ability";
import Type from "./Type";

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

  function capitalizeName() {
    return pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  }

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

  const abilities = pokemon.abilities.map(item => {
    return <Ability name={item.ability.name} key={item.ability.url} hidden={item.is_hidden}/>;
  });

  const types = pokemon.types.map(item => {
    return <Type name={item.type.name} key={item.type.name}/>;
  });

  return (
    <div className={"pokemon-container"}>
      <h1>{capitalizeName()}</h1>
      <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name}/>
      <img src={pokemon.sprites.back_default} alt={pokemon.name + " game icon"}/>
      <ul>
        <li>HP : {pokemon.stats[0].base_stat}</li>
        <li>Attack : {pokemon.stats[1].base_stat}</li>
        <li>Defense : {pokemon.stats[2].base_stat}</li>
        <li>Special Attack : {pokemon.stats[3].base_stat}</li>
        <li>Special Defense : {pokemon.stats[4].base_stat}</li>
        <li>Speed : {pokemon.stats[5].base_stat}</li>
      </ul>
      <div className={"ability-container"}>
        {abilities}
      </div>
      <div className={"type-container"}>
        {types}
      </div>
    </div>
  );

}

export default PokemonDetails;