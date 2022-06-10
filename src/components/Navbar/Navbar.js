import React from "react";
import { Link } from "react-router-dom";
import houseIcon from "../../assets/icons/house.svg";
import shoppingBagIcon from "../../assets/icons/shopping-bag.svg";
import shoppingCartIcon from "../../assets/icons/shopping-cart.svg";
import "./navbar.css";

export default function Navbar(props) {

  React.useEffect(() => {

  });

  return (
    <nav className={"navbar"}>
      <Link to={"/"}>
        <img src={houseIcon} alt={"house icon"}/>
        <h2>Home</h2>
      </Link>
      <Link to={"/store"}>
        <img src={shoppingBagIcon} alt={"shopping bag icon"}/>
        <h2>Store</h2>
      </Link>
      <Link className={"link cart-link"} to={"/cart"}>
        {props.cartLength > 0 && <p className={"cart-length"} data-testid={"cart-length-test"}>{props.cartLength}</p>}
        <img src={shoppingCartIcon} alt={"shopping cart icon"}/>
        <h2>Cart</h2>
      </Link>
    </nav>
  );
}