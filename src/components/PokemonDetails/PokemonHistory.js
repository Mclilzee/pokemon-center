import React from "react";
import { Link } from "react-router-dom";
import { capitalize } from "../../helperFunctions";

function PokemonHistory(props) {
  const [history, setHistory] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch(props.url);
        const item = await data.json();
        setHistory(item);
      } catch (e) {
        setError(e);
      }
    }

    fetchData();
  });

  function generateEvolutionLink() {
    if (history.evolves_from_species === null) {
      return "None";
    }

    const evolvesFrom = history.evolves_from_species.name;
    return <Link className={"evolve-link"} to={`/pokemon/${evolvesFrom}`}>{capitalize(evolvesFrom)}< /Link>;
  }

  if (error !== null) {
    return <div data-testid={"error-message"}></div>
  }

  if (history === null) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={"pokemon-history"}>
      <h2 className={"flavor-message"}>{history.flavor_text_entries[0].flavor_text}</h2>
      <h3 className={"habitat-message"}>Habitat : {capitalize(history.habitat.name)}</h3>
      <h3 data-testid={"evolution-test"} className={"evolve-message"}>Evolves from : {generateEvolutionLink()}</h3>
    </div>
  );
}

export default PokemonHistory;