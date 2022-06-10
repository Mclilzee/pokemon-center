import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "../Navbar";
import { act } from "react-dom/test-utils";
import { BrowserRouter, Router } from "react-router-dom";

describe("Basic Rendering", () => {
  beforeEach(() => {
    act(() => {
      render(
        <BrowserRouter>
          <Navbar/>)
        </BrowserRouter>
      );
    });
  });

  test("Renders", () => {
  });

  test("Home link in document", () => {
    const homepageLink = screen.getByRole("link", {name: /.*Home.*/});
    expect(homepageLink).toBeInTheDocument();
  });

  test("Home link contains correct href", () => {
    const homepageLink = screen.getByRole("link", {name: /.*Home.*/});
    expect(homepageLink).toHaveAttribute("href", "/");
  });

  test("Home link contains correct icon", () => {
    const homepageLink = screen.getByRole("link", {name: /.*Home.*/});
    screen.debug();
    expect(homepageLink.firstChild).toHaveAttribute("src", "house.svg");
  });

  test("Store link in document", () => {
    const storeLink = screen.getByRole("link", {name: /.*Store.*/});
    expect(storeLink).toBeInTheDocument();
  });

  test("Store link contains correct href", () => {
    const storeLink = screen.getByRole("link", {name: /.*Store.*/});
    expect(storeLink).toHaveAttribute("href", "/store");
  });

  test("Store link contains correct href", () => {
    const storeLink = screen.getByRole("link", {name: /.*Store.*/});
    expect(storeLink.firstChild).toHaveAttribute("src", "shopping-bag.svg");
  });

  test("Cart link in document", () => {
    const cartLink = screen.getByRole("link", {name: /.*Cart.*/});
    expect(cartLink).toBeInTheDocument();
  });

  test("Cart link contains correct href", () => {
    const cartLink = screen.getByRole("link", {name: /.*Cart.*/});
    expect(cartLink).toHaveAttribute("href", "/cart");
  });

  test("Cart link contains correct href", () => {
    const cartLink = screen.getByRole("link", {name: /.*Cart.*/});
    expect(cartLink.firstChild).toHaveAttribute("src", "shopping-cart.svg");
  });
});

describe("Functionality handling", () => {
  test("Cart containing amount in document", () => {
    act(() => {
      render(<BrowserRouter>
        <Navbar cartLength={2}/>
      </BrowserRouter>);
    });

    const cartLengthNumber = screen.getByTestId("cart-length-test");
    expect(cartLengthNumber).toBeInTheDocument();
  });

  test("Cart length show the currect number", () => {
    act(() => {
      render(<BrowserRouter>
        <Navbar cartLength={2}/>
      </BrowserRouter>);
    });

    const cartLengthNumber = screen.getByTestId("cart-length-test");
    expect(cartLengthNumber.textContent).toBe("2");
  });

  test("Cart length show don't render when empty", () => {
    act(() => {
      render(<BrowserRouter>
        <Navbar cartLength={0}/>
      </BrowserRouter>);
    });

    const cartLengthNumber = screen.queryByTestId("cart-length-test");
    expect(cartLengthNumber).not.toBeInTheDocument();
  });
});