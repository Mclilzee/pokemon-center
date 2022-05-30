import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "./Navbar";

describe("Navbar renders correctly", () => {

  test("Navbar renders", () => {
    render(<Navbar/>);
  });

  test("Navbar home link in document", () => {
    render(<Navbar/>);

    const homepageLink = screen.getByText("Home");
    expect(homepageLink).toBeInTheDocument();
  });

  test("Navbar store link in document", () => {
    render(<Navbar/>);

    const homepageLink = screen.getByText("Cart");
    expect(homepageLink).toBeInTheDocument();
  });

  test("Navbar cart link in document", () => {
    render(<Navbar/>);

    const homepageLink = screen.getByText("Store");
    expect(homepageLink).toBeInTheDocument();
  });

});