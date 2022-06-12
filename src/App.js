import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./components/Homepage/Homepage";
import Store from "./components/Storepage/Store";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails";
import Cart from "./components/Cart/Cart";
import Alert from "./components/Alert/Alert";
import { Routes, Route } from "react-router-dom";
import { capitalize } from "./helperFunctions";

function App() {

  const [cartContent, setCartContent] = React.useState(() => {
    return JSON.parse(localStorage.getItem("pokemons")) || {};
  });
  const [alert, setAlert] = React.useState({});
  const [displayAlert, setDisplayAlert] = React.useState(true);

  React.useEffect(() => {
    localStorage.setItem("pokemons", JSON.stringify(cartContent));
  }, [cartContent]);

  React.useEffect(() => {
    setDisplayAlert(true);
  }, [alert]);

  function addPokemonToCart(pokemonName, icon, amount) {
    if (amount > 10) {
      amount = 10;
    }

    setCartContent(prevState => {
      if (prevState[pokemonName] !== undefined) {
        return adjustPokemonAmount(prevState, pokemonName, icon, amount);
      } else {
        setPokemonAddedToCartAlert(capitalize(pokemonName), amount);
        return {...prevState, [pokemonName]: {name: pokemonName, icon, amount}};
      }
    });
  }

  function adjustPokemonAmount(prevState, pokemonName, icon, amount) {
    if (prevState[pokemonName].amount >= 10) {
      setPokemonBuyLimitAlert();
      return {...prevState};
    }

    let newAmount = prevState[pokemonName].amount + amount;
    if (newAmount > 10) {
      newAmount = 10;
    }
    setPokemonAddedToCartAlert(capitalize(pokemonName), newAmount);
    return {...prevState, [pokemonName]: {name: pokemonName, icon, amount: newAmount}};
  }

  function removePokemon(pokemonName) {
    setCartContent(prevState => {
      const newCartContent = {...prevState};
      delete newCartContent[pokemonName];
      setPokemonRemovedFromCartAlert(capitalize(pokemonName));
      return newCartContent;
    });
  }

  function clearCart() {
    setCartContent({});
    setAlert({message: "Cart is now empty!", completed: true});
  }

  function confirmPurchase() {
    setAlert({message: "This was a prank! you can't really buy pokemons, let alone free ones.", completed: false});
  }

  function setPokemonBuyLimitAlert() {
    setAlert({
      message: "You can only buy 10 of each type of pokemon!",
      completed: false
    });
  }

  function setPokemonAddedToCartAlert(pokemonName, amount) {
    setAlert({
      message: `You now have ${amount} of ${pokemonName} in Cart!`,
      completed: true
    });
  }

  function setPokemonRemovedFromCartAlert(pokemonName) {
    setAlert({
      message: `${pokemonName} has been removed from Cart`,
      completed: true
    });
  }

  function hideAlert() {
    setDisplayAlert(false);
  }

  return (<div>
    {displayAlert && <Alert message={alert.message} completed={alert.completed} hideAlert={hideAlert}/>}
    <Navbar cartLength={Object.keys(cartContent).length}/>
    <Routes>
      <Route path={"/"} element={<Homepage/>}/>
      <Route path={"/store"} element={<Store handleSubmit={addPokemonToCart}/>}/>
      <Route path={"/pokemon/:pokemonName"} element={<PokemonDetails/>}/>
      <Route path={"/cart"}
             element={<Cart pokemons={cartContent} removePokemon={removePokemon} clearCart={clearCart} confirmPurchase={confirmPurchase}/>}/>
    </Routes>
  </div>);
}

export default App;
