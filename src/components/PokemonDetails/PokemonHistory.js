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

  function getFlavorMessage() {
    if (history.flavor_text_entries == null) {
      return null;
    }

    const englishText = history.flavor_text_entries
      .reverse()
      .map(x => x.flavor_text)
      .find(x => x.match(/^[a-zA-Z]/gi));

    if (englishText == null) {
      return null
    }

    return <h2 data-testid={"flavor-test"} className={"flavor-message"}>
      {englishText}
    </h2 >
  }

  function generateEvolutionLink() {
    if (history.evolves_from_species === null) {
      return "None";
    }

    const evolvesFrom = history.evolves_from_species.name;
    return <Link className={"evolve-link"} to={`/pokemon/${evolvesFrom}`}>{capitalize(evolvesFrom)}</Link>;
  }

  if (error !== null) {
    return <div data-testid={"error-message"}></div>;
  }

  if (history === null) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={"pokemon-history"}>
      {getFlavorMessage()}
      {history.habitat !== null &&
        <div data-testid={"habitat-test"} className={"habitat-message"}>
          <h3 className={"habitat"}>Habitat</h3>
          <h3 className={"habitat-name"}>{capitalize(history.habitat.name)}</h3>
        </div>
      }
      <div data-testid={"evolution-test"} className={"evolution-message"}>
        <h3 className={"evolves-from"}>Evolves from</h3>
        <h3 className={"evolution-name"}>{generateEvolutionLink()}</h3>
      </div>
    </div>
  );
}

export default PokemonHistory;
