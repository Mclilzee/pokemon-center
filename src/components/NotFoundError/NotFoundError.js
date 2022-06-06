import React from "react";
import "./notFoundError.css";

function NotFoundError(props) {

  return (
    <div className={"error-container"}>
      <img src={"../assets/images/pokemon-ball.png"} alt={"pokemon ball"}/>
      <h1 className={"error-number"}>404</h1>
      <p className={"error-message"}>{props.pokemonName} Cannot be found sadly, Maybe it's a pokemon that is good at
        hiding, or is not yet a pokemon!! Try again later, hopefully it has been caught.</p>
    </div>
  );
}

export default NotFoundError;