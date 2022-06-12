import React from "react";
import CartPokemon from "./CartPokemon";
import "./cart.css";

function Cart(props) {

  const pokemons = Object.values(props.pokemons).map(item => {
    return <CartPokemon key={item.name} name={item.name} icon={item.icon} amount={item.amount} removePokemon={props.removePokemon}/>;
  });
  return (
    <div className={"cart-container"}>
      <div className={"user-choice-container"}>
        <button className={"confirm-button"}>Confirm puchrase</button>
        <button className={"clear-button"}>Clear cart</button>
      </div>
      <div className={"cart-items-container"}>
        {pokemons}
      </div>
    </div>
  );
}

export default Cart;