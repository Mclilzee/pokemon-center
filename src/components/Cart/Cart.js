import React from "react";
import CartPokemon from "./CartPokemon";

function Cart(props) {
  console.log(props.pokemons);

  const pokemons = props.pokemons.map(item => {
    return <CartPokemon key={item.name} name={item.name} amount={item.amount}/>;
  });
  return (
    <h1>{pokemons}</h1>
  );
}

export default Cart;