import React from "react";

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

  if (error !== null) {
    return;
  }

  if (history === null) {
    return <h1>Loading...</h1>;
  }

  return (
    <h2>{history.flavor_text_entries[0].flavor_text}</h2>
  )
}

export default PokemonHistory;