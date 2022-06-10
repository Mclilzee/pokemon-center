import React from "react";
import completedIcon from "../../assets/icons/completed.svg";
import errorIcon from "../../assets/icons/error.svg";

function Alert(props) {

  return (
    <div className={"alert-container"}>
      <h1>{props.completed ? "Success!" : "Error"}</h1>
      <img src={props.completed ? completedIcon : errorIcon} alt={props.completed ? "completed icon" : "error icon"}/>
      <h2>{props.message}</h2>
    </div>
  );
}

export default Alert;