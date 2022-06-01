import React from "react";

function Pokemon(props) {

  return (
    <div className={"pokemon-information"}>
      <img className={"pokemon-image"} src={props.img !== null ? props.img : "./assets/images/pokemon-ball.png"}
           alt={`${props.name}`}/>
      <h2 className={"pokemon-name"}>{props.name}</h2>
      <h4 data-testid="type-test" className={"pokemon-type"}>{props.type}</h4>
    </div>
  );
}

export default Pokemon;