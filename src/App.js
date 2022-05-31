import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./components/Homepage/Homepage";
import Store from "./components/Storepage/Store";
import { fetchPokemons } from "./PokemonDB";

function App() {

  React.useEffect(() => {
    fetchPokemons();
  }, []);


  return (
    <div>
      <Navbar/>
      {/*<Homepage/>*/}
      <Store/>
    </div>
  );
}

export default App;
