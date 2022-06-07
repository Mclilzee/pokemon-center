import React from "react";

function Ability(props) {
  return (
    <div className={"ability-container"}>
      <h3>{props.name}<span className={"hidden-message"}>{props.hidden ? " ( hidden )" : ""}</span></h3>
    </div>
  );
}

export default Ability;