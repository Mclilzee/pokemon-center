import React from "react";

function CartPokemon(props) {

  return (
    <div>
      <h1>{props.name} {props.amount}</h1>
      <img src={props.icon} alt={props.name + " icon"}/>
    </div>
  );
}

export default CartPokemon;