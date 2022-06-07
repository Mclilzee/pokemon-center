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
    const homepageLink = screen.getByRole("link", {name: "Home"});
    expect(homepageLink).toBeInTheDocument();
  });

  test("Home link contains correct href", () => {
    const homepageLink = screen.getByRole("link", {name: "Home"});
    expect(homepageLink).toHaveAttribute("href", "/");
  });

  test("Store link in document", () => {
    const storeLink = screen.getByRole("link", {name: "Store"});
    expect(storeLink).toBeInTheDocument();
  });

  test("Store link contains correct href", () => {
    const storeLink = screen.getByRole("link", {name: "Store"});
    expect(storeLink).toHaveAttribute("href", "/store");
  });

  test("Cart link in document", () => {
    const cartLink = screen.getByRole("link", {name: "Cart"});
    expect(cartLink).toBeInTheDocument();
  });

  test("Cart link contains correct href", () => {
    const cartLink = screen.getByRole("link", {name: "Cart"});
    expect(cartLink).toHaveAttribute("href", "/cart");
  });
});