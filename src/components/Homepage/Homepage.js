import React from "react";
import "./homepage.css";
import pokemonBallImage from "../../assets/images/pokemon-ball.png";

function Homepage(props) {

  return (
    <div className={"homepage"}>
      <img src={pokemonBallImage} alt={"pokemon ball"}/>
      <h1>Welcome to Pokémon center traveler!</h1>
      <p data-testid={"description"}>Pick and choose a pokemon to purchase, they are all free, buy as many as you would
        like without paying a cent.
        Isn't this a perfect world that you wish you live in?
      </p>
      <p className={"warning-message"} data-testid={"warning-message"}>Warning: Before going to the store, make sure you
        are on a wifi connection. The store will be constantly downloading images, especially if you make use of the rapid search function.</p>
    </div>
  );
}

export default Homepage;