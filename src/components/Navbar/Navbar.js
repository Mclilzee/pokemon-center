import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {

  React.useEffect(() => {

  })

  return (
    <nav className={"navbar"}>
      <Link to={"/"}>
        <h2>Home</h2>
      </Link>
      <Link to={"/store"}>
        <h2>Store</h2>
      </Link>
      <Link className={"link cart-link"} to={"/cart"}>
        {props.cartLength > 0 && <p>{props.cartLength}</p>}
        <h2>Cart</h2>
      </Link>
    </nav>
  );
}