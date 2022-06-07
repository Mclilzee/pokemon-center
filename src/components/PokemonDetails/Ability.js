import React from "react";

function Ability(props) {
  return (
    <h3 className={"ability"}>{props.name}<span className={"hidden-message"}>{props.hidden ? " ( hidden )" : ""}</span>
    </h3>
  );
}

export default Ability;