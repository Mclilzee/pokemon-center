import React from "react";
import CartPokemon from "./CartPokemon";
import "./cart.css";

function Cart(props) {

  const pokemons = Object.values(props.pokemons).map(item => {
    return (
      <CartPokemon
        key={item.name}
        name={item.name}
        icon={item.icon}
        amount={item.amount}
        removePokemon={props.removePokemon}
        handleAmountChange={props.handleAmountChange}
      />
    );
  });

  if (Object.values(props.pokemons).length === 0) {
    return (
      <h1 className={"empty-cart-message"}>Cart is currently empty, Add pokemons to cart from the store!</h1>
    );
  }

  return (
    <div className={"cart-container"}>
      <div className={"user-choice-container"}>
        <button onClick={props.confirmPurchase} className={"confirm-button"}>Confirm puchrase</button>
        <button onClick={props.clearCart} className={"clear-button"}>Clear cart</button>
      </div>
      <div className={"cart-items-container"}>
        {pokemons}
      </div>
    </div>
  );
}

export default Cart;