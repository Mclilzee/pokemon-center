import React from "react";
import NotFoundError from "../NotFoundError/NotFoundError";
import { useParams } from "react-router-dom";

function PokemonDetails(props) {
  const [pokemonObject, setPokemonObject] = React.useState({});
  const [error, setError] = React.useState(null);
  const {pokemonName} = useParams();

  React.useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const item = await data.json();
        setPokemonObject(item);
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


  return <h1>{pokemonObject.cause}</h1>;

}

export default PokemonDetails;