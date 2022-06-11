import React from "react";
import CartPokemon from "./CartPokemon";

function Cart(props) {

  const pokemons = Object.values(props.pokemons).map(item => {
    return <CartPokemon key={item.name} name={item.name} amount={item.amount}/>;
  });
  return (
    <div className={"cart-container"}>
      {pokemons}
    </div>
  );
}

export default Cart;