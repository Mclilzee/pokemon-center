import React from "react";
import { Link } from "react-router-dom";

function CartPokemon(props) {

  return (
    <div className={"cart-pokemon"}>
      <img className={"pokemon-icon"} src={props.icon} alt={props.name + " icon"}/>
      <Link className={"pokemon-name"} to={`/pokemon/${props.name}`}>
        {props.name}
      </Link>
      <input className={"amount-input"} type={"number"} min={1} max={10} value={props.amount}/>
      <button className={"remove-button"}>X</button>
    </div>
  );
}

export default CartPokemon;