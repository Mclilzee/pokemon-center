import React from "react";
import { capitalize } from "../../helperFunctions";

function Type(props) {

  return (
    <li className={`type ${props.name}`}>{capitalize(props.name)}</li>
  );
}

export default Type;