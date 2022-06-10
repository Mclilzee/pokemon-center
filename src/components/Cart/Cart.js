import React from "react";
import CartPokemon from "./CartPokemon";

function Cart(props) {
  console.log(props.pokemons);

  const pokemons = props.pokemons.map(item => {
    return <CartPokemon key={item.name} name={item.name} amount={item.amount}/>;
  });
  return (
    <div className={"cart-container"}>
      {pokemons}
    </div>
  );
}

export default Cart;