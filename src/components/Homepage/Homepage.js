import React from "react";
import "./homepage.css";

function Homepage(props) {

  return (
    <div className={"homepage"}>
      <h1>Pokémon Center</h1>
      <h3>Welcome to Pokémon center traveler!</h3>
      <p data-testid={"description"}>Pick and choose a pokemon to purchase, they are all free, buy as many as you would
        like without paying a cent.
        Isn't this a perfect world that you wish you live in?
      </p>
    </div>
  );
}

export default Homepage;