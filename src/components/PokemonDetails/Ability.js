import React from "react";

function Ability(props) {
  return (
    <li className={"ability"}>{props.name}{props.hidden && <span className={"hidden-message"}> ( hidden )</span>}
    </li>
  );
}

export default Ability;