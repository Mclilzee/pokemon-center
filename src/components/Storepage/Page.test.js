import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserEvent from "@testing-library/user-event";
import Page from "./Page";

describe("Basic Rendering", () => {
  test("Renders correctly", () => {
    render(<Page pageNumber={5}/>);

    const pageNumber = screen.getByText("5");
    expect(pageNumber).toBeInTheDocument();
  });

  test("Previous Page Number hidden", () => {
    render(<Page pageNumber={1}/>);

    const previousPageNumber = screen.getByTestId("previous-number");
    expect(previousPageNumber).not.toBeVisible();
  });

  test("Prevoius Page Number visible", () => {
    render(<Page pageNumber={2}/>);

    const previousPageNumber = screen.getByTestId("previous-number");
    expect(previousPageNumber).toBeVisible();
  });

  test("Next Page Number hidden", () => {
    render(<Page pageNumber={2} maxPageNumber={2}/>);

    const nextPageNumber = screen.getByTestId("next-number");
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

describe("Show currect values", () => {

})

describe("Test incrementing and decrementing functions", () => {
  test("Function called on next page number click", () => {

    const nextPage = jest.fn();

    render(<Page pageNumber={2} nextPage={nextPage}/>);

    const nextPageNumber = screen.getByTestId("next-number");
    UserEvent.click(nextPageNumber);
    UserEvent.click(nextPageNumber);

    expect(nextPage).toBeCalledTimes(2);
  });

  test("Function called on previous page number click", () => {

    const previousPage = jest.fn();

    render(<Page pageNumber={2} previousPage={previousPage}/>);

    const previousPageNumber = screen.getByTestId("previous-number");
    UserEvent.click(previousPageNumber);
    UserEvent.click(previousPageNumber);

    expect(previousPage).toBeCalledTimes(2);
  });

  test("Function called on next arrow click", () => {

    const nextPage = jest.fn();

    render(<Page pageNumber={2} nextPage={nextPage}/>);

    const nextPageArrow = screen.getByAltText("next arrow");
    UserEvent.click(nextPageArrow);
    UserEvent.click(nextPageArrow);

    expect(nextPage).toBeCalledTimes(2);
  });

  test("Function called on next arrow click", () => {

    const previousPage = jest.fn();

    render(<Page pageNumber={2} previousPage={previousPage}/>);

    const previousPageArrow = screen.getByAltText("previous arrow");
    UserEvent.click(previousPageArrow);
    UserEvent.click(previousPageArrow);

    expect(previousPage).toBeCalledTimes(2);
  });
});
