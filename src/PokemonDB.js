let pokemons = [];

async function fetchPokemons() {
  const pokemonData = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
  const pokemonItems = await pokemonData.json();
  pokemons = pokemonItems.results;

  printPokemons();
}

function searchPokemons(name) {
  const found = [];
  let pattern = new RegExp(`*${name}*`, "i");

  for (let pokemon of pokemons) {
    if (pokemon.name.match(pattern)) {
      found.push(pokemon);
    }
  }

  return found;
}

function getPokemonsPage(pageNumber) {
  const offset = (pageNumber - 1) * 20;
  const limit = offset + 20;
  return pokemons.slice(offset, limit);
}


export { fetchPokemons, searchPokemons };