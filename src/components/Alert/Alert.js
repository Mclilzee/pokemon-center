import React from "react";
import completedIcon from "../../assets/icons/completed.svg";
import errorIcon from "../../assets/icons/error.svg";
import "./alert.css";

function Alert(props) {

  if (props.message === undefined) {
    return <></>;
  }
  return (
    <div className={"alert-container"}>
      <div className={"alert"}>
        <h1 className={"title"}>{props.completed ? "Success!" : "Error"}</h1>
        <img src={props.completed ? completedIcon : errorIcon} alt={props.completed ? "completed icon" : "error icon"}/>
        <h2 className={"message"}>{props.message}</h2>
      </div>
    </div>
  );
}

export default Alert;