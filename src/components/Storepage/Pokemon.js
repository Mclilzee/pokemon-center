import React from "react";

function Pokemon(props) {

  function capitalizeName() {
    if (props.name.length < 1) {
      return;
    }

    return props.name[0].toUpperCase() + props.name.slice(1);
  }

  function generateTypeString() {
    let typeArray = [];

    for (let type of props.types) {
      typeArray.push(type.type.name);
    }

    return typeArray.join(" / ");
  }

  return (
    <div className={"pokemon-information"}>
      <img className={"pokemon-image"} src={props.img !== null ? props.img : "./assets/images/pokemon-ball.png"}
           alt={`${props.name}`}/>
      <h2 className={"pokemon-name"}>{capitalizeName()}</h2>
      <h4 className={"pokemon-type"}>{generateTypeString()}</h4>
    </div>
  );
}

export default Pokemon;