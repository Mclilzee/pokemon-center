import React from "react";

function Stat(props) {
  return (
    <li>{props.name} : {props.number}</li>
  );
}

export default Stat;