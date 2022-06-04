import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {

  return (
    <nav className={"navbar"}>
      <Link to={"/"}>
        <h2>Home</h2>
      </Link>
      <Link to={"/store"}>
        <h2>Store</h2>
      </Link>
      <h2>Cart</h2>
    </nav>
  );
}