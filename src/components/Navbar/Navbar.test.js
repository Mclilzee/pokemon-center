import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "./Navbar";
import { act } from "react-dom/test-utils";
import { BrowserRouter, Router } from "react-router-dom";

describe("Navbar renders correctly", () => {

  beforeEach(() => {
    act(() => {
      render(
        <BrowserRouter>
          <Navbar/>)
        </BrowserRouter>
      );
    });
  });

  test("Navbar renders", () => {
  });

  test("Navbar home link in document", () => {
    const homepageLink = screen.getByText("Home");
    expect(homepageLink).toBeInTheDocument();
  });

  test("Navbar store link in document", () => {
    const homepageLink = screen.getByText("Cart");
    expect(homepageLink).toBeInTheDocument();
  });

  test("Navbar cart link in document", () => {
    const homepageLink = screen.getByText("Store");
    expect(homepageLink).toBeInTheDocument();
  });
});