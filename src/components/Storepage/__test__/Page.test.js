import React from "react";
import { screen, render, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserEvent from "@testing-library/user-event";
import Page from "../Page";

describe("Basic Rendering", () => {
  test("Renders correctly", () => {
    act(() => {
      render(<Page pageNumber={5}/>);
    });

    const pageNumber = screen.getByText("5");
    expect(pageNumber).toBeInTheDocument();
  });

  test("Previous Page Number hidden", () => {
    act(() => {
      render(<Page pageNumber={1}/>);
    });

    const previousPageNumber = screen.getByTestId("previous-number");
    expect(previousPageNumber).not.toBeVisible();
  });

  test("Prevoius Page Number visible", () => {
    act(() => {
      render(<Page pageNumber={2}/>);
    });

    const previousPageNumber = screen.getByTestId("previous-number");
    expect(previousPageNumber).toBeVisible();
  });

  test("Next Page Number hidden", () => {
    act(() => {
      render(<Page pageNumber={2} maxPageNumber={2}/>);
    });

    const nextPageNumber = screen.getByTestId("next-number");
    expect(nextPageNumber).not.toBeVisible();
  });

  test("Next Page Number visible", () => {
    act(() => {
      render(<Page pageNumber={2} maxPageNumber={3}/>);
    });

    const nextPageNumber = screen.getByText("3");
    expect(nextPageNumber).toBeVisible();
  });

  test("Previous Page arrow hidden", () => {
    act(() => {
      render(<Page pageNumber={1} maxPageNumber={2}/>);
    });

    const nextPageNumber = screen.getByAltText("previous arrow");
    expect(nextPageNumber).not.toBeVisible();
  });

  test("Previous Page arrow visible", () => {
    act(() => {
      render(<Page pageNumber={2} maxPageNumber={2}/>);
    });

    const nextPageNumber = screen.getByAltText("previous arrow");
    expect(nextPageNumber).toBeVisible();
  });

  test("Next Page arrow hidden", () => {
    act(() => {
      render(<Page pageNumber={2} maxPageNumber={2}/>);
    });

    const nextPageNumber = screen.getByAltText("next arrow");
    expect(nextPageNumber).not.toBeVisible();
  });

  test("Next Page arrow visible", () => {
    act(() => {
      render(<Page pageNumber={2} maxPageNumber={3}/>);
    });

    const nextPageNumber = screen.getByAltText("next arrow");
    expect(nextPageNumber).toBeVisible();
  });

});

describe("Show the correct values", () => {
  test("Show correct previous number if page number more than 5", () => {
    act(() => {
      render(<Page pageNumber={6}/>);
    });

    const previousPageNumber = screen.getByTestId("previous-number");
    expect(previousPageNumber.textContent).toBe("2");
  });


  test("Show correct previous number if page number less than 5", () => {
    act(() => {
      render(<Page pageNumber={3}/>);
    });

    const previousPageNumber = screen.getByTestId("previous-number");
    expect(previousPageNumber.textContent).toBe("1");
  });

  test("Show correct next number if page number less than max page number by 5", () => {
    act(() => {
      render(<Page pageNumber={2}/>);
    });

    const previousPageNumber = screen.getByTestId("next-number");
    expect(previousPageNumber.textContent).toBe("6");
  });

  test("Show correct next number if page number less than max page number by 1", () => {
    act(() => {
      render(<Page pageNumber={3} maxPageNumber={4}/>);
    });

    const previousPageNumber = screen.getByTestId("next-number");
    expect(previousPageNumber.textContent).toBe("4");
  });
});

describe("Test incrementing and decrementing functions", () => {
  test("Function called on next page number click", () => {

    const newPageNumber = jest.fn();
    act(() => {
      render(<Page pageNumber={2} newPageNumber={newPageNumber}/>);
    });

    const nextPageNumber = screen.getByTestId("next-number");
    UserEvent.click(nextPageNumber);
    UserEvent.click(nextPageNumber);

    expect(newPageNumber).toBeCalledTimes(2);
  });

  test("Function called on previous page number click", () => {
    const newPageNumber = jest.fn();
    act(() => {
      render(<Page pageNumber={2} newPageNumber={newPageNumber}/>);
    });

    const previousPageNumber = screen.getByTestId("previous-number");
    UserEvent.click(previousPageNumber);
    UserEvent.click(previousPageNumber);

    expect(newPageNumber).toBeCalledTimes(2);
  });

  test("Function called on next arrow click", () => {
    const newPageNumber = jest.fn();
    act(() => {
      render(<Page pageNumber={2} newPageNumber={newPageNumber}/>);
    });

    const nextPageArrow = screen.getByAltText("next arrow");
    UserEvent.click(nextPageArrow);
    UserEvent.click(nextPageArrow);

    expect(newPageNumber).toBeCalledTimes(2);
  });

  test("Function called on next arrow click", () => {
    const newPageNumber = jest.fn();
    act(() => {
      render(<Page pageNumber={2} newPageNumber={newPageNumber}/>);
    });

    const previousPageArrow = screen.getByAltText("previous arrow");
    UserEvent.click(previousPageArrow);
    UserEvent.click(previousPageArrow);

    expect(newPageNumber).toBeCalledTimes(2);
  });
});