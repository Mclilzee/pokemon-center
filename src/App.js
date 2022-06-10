import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./components/Homepage/Homepage";
import Store from "./components/Storepage/Store";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails";
import Cart from "./components/Cart/Cart";
import { Routes, Route } from "react-router-dom";

function App() {

  const [cartArray, setCartArray] = React.useState([]);

  function addPokemonToCart(pokemonName, amount) {
    setCartArray(prevState => {
      let newArray = [...prevState];
      for (let pokemon of newArray) {
        if (pokemon.name === pokemonName) {
          pokemon.amount += amount;
          return newArray;
        }
      }

      newArray.push({name: pokemonName, amount});
      return newArray;
    });

  }


  return (
    <div>
      <Navbar cartLength={cartArray.length}/>
      <Routes>
        <Route path={"/"} element={<Homepage/>}/>
        <Route path={"/store"} element={<Store handleSubmit={addPokemonToCart}/>}/>
        <Route path={"/pokemon/:pokemonName"} element={<PokemonDetails/>}/>
        <Route path={"/cart"} element={<Cart pokemons={cartArray}/>}/>
      </Routes>
    </div>
  );
}

export default App;
