import React from "react";
import { Link } from "react-router-dom";
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
        <div className={"alert-information"}>
          <h1 className={"title"}>{props.completed ? "Success!" : "Error"}</h1>
          <img src={props.completed ? completedIcon : errorIcon}
               alt={props.completed ? "completed icon" : "error icon"}/>
          <h2 className={"message"}>{props.message}</h2>
        </div>
        <div className={"buttons"}>
          <Link to={"/store"}>
            <button className={"continue-shopping-button"} onClick={props.hideAlert}>Continue Shopping</button>
          </Link>
          <Link to={"/cart"}>
            <button className={"cart-button"} onClick={props.hideAlert}>Go to cart</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Alert;