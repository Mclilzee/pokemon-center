import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./components/Homepage/Homepage";
import Store from "./components/Storepage/Store";

function App() {

  const [cartArray, setCartArray] = React.useState([]);

  function addPokemonToCart(amount, pokemonName) {
    setCartArray(prevState => {
      let newArray = [...prevState]
      for (let pokemon of newArray) {
        if (pokemon.name === pokemonName) {
          pokemon.amount += amount;
          return newArray;
        }
      }

      newArray.push({name: pokemonName, amount})
      return newArray
    });

  }


  return (
    <div>
      <Navbar/>
      {/*<Homepage/>*/}
      <Store handleSubmit={addPokemonToCart}/>
    </div>
  );
}

export default App;
