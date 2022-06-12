import React from "react";
import { Link } from "react-router-dom";
import pokemonBallImage from "../../assets/images/pokemon-ball.png";

function CartPokemon(props) {

  function handleRemoveClick() {
    props.removePokemon(props.name);
  }

  return (
    <div className={"cart-pokemon"}>
      <img className={"pokemon-icon"} src={props.icon !== null ? props.icon : pokemonBallImage}
           alt={props.name + " icon"}/>
      <Link className={"pokemon-name"} to={`/pokemon/${props.name}`}>
        {props.name}
      </Link>
      <input className={"amount-input"} type={"number"} min={1} max={10} value={props.amount}/>
      <button onClick={handleRemoveClick} className={"remove-button"}>X</button>
    </div>
  );
}

export default CartPokemon;