import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "./Page";

describe("Basic Rendering", () => {
  test("Renders correctly", () => {
    render(<Page pageNumber={5}/>);

    const pageNumber = screen.getByText("5");
    expect(pageNumber).toBeInTheDocument();
  });

  test("Previous Page Number hidden", () => {
    render(<Page pageNumber={1}/>);

    const previousPageNumber = screen.getByText("0");
    expect(previousPageNumber).not.toBeVisible();
  });

  test("Prevoius Page Number visible", () => {
    render(<Page pageNumber={2}/>);

    const previousPageNumber = screen.getByText("1");
    expect(previousPageNumber).toBeVisible();
  });

  test("Next Page Number hidden", () => {
    render(<Page pageNumber={2} maxPageNumber={2}/>);

    const nextPageNumber = screen.getByText("3");
    expect(nextPageNumber).not.toBeVisible();
  });

  test("Next Page Number visible", () => {
    render(<Page pageNumber={2} maxPageNumber={3}/>);

    const nextPageNumber = screen.getByText("3");
    expect(nextPageNumber).toBeVisible();
  });

  test("Previous Page arrow hidden", () => {
    render(<Page pageNumber={1} maxPageNumber={2}/>);

    const nextPageNumber = screen.getByAltText("previous arrow");
    expect(nextPageNumber).not.toBeVisible();
  });

  test("Previous Page arrow visible", () => {
    render(<Page pageNumber={2} maxPageNumber={2}/>);

    const nextPageNumber = screen.getByAltText("previous arrow");
    expect(nextPageNumber).toBeVisible();
  });

  test("Next Page arrow hidden", () => {
    render(<Page pageNumber={2} maxPageNumber={2}/>);

    const nextPageNumber = screen.getByAltText("next arrow");
    expect(nextPageNumber).not.toBeVisible();
  });

  test("Next Page arrow visible", () => {
    render(<Page pageNumber={2} maxPageNumber={3}/>);

    const nextPageNumber = screen.getByAltText("next arrow");
    expect(nextPageNumber).toBeVisible();
  });

});

describe("Test incrementing and decrementing functions" , () => {

})
