import React from "react";
import { Link } from "react-router-dom";
import pokemonBallImage from "../../assets/images/pokemon-ball.png";

function CartPokemon(props) {

  function handleRemoveClick() {
    props.removePokemon(props.name);
  }

  function handleAmountChange(e) {
    const newAmount = Number(e.target.value);

    props.handleAmountChange(props.name, newAmount);
  }

  return (
    <div className={"cart-pokemon"}>
      <img className={"pokemon-icon"} src={props.icon ? props.icon : pokemonBallImage}
           alt={props.name + " icon"}/>
      <Link className={"pokemon-name"} to={`/pokemon/${props.name}`}>
        {props.name}
      </Link>
      <input className={"amount-input"} type={"number"} min={1} max={10} value={props.amount}
             onChange={handleAmountChange}/>
      <button onClick={handleRemoveClick} className={"remove-button"}>X</button>
    </div>
  );
}

export default CartPokemon;