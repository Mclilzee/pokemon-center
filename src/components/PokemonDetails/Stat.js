import React from "react";

function Stat(props) {
  return (
    <li className={props.className}>{props.name} : {props.number}</li>
  );
}

export default Stat;