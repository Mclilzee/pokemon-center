import React from "react";

function Ability(props) {
  return (
    <li className={"ability"}>{props.name}<span className={"hidden-message"}>{props.hidden ? " ( hidden )" : ""}</span>
    </li>
  );
}

export default Ability;