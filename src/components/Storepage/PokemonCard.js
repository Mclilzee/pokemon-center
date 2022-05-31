import React from "react";

function PokemonCard(props) {


  return (
    <div className={"pokemon-card"}>
      <img src={props.img} alt={`Image of ${props.name}`}/>
      <h2>{props.name}</h2>
    </div>
  );
}

export default PokemonCard;