import React from "react";
import { screen, render, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Store from "./Store";

const mockArray = [
  {
    name: "bulbasaur",
    url: "bulbasaur.come"
  },
  {
    name: "squirtle",
    url: "squirtle.com"
  },
  {
    name: "charizard",
    url: "charizard.com"
  }
];

beforeEach(() => {
  jest.spyOn(global, "fetch").mockImplementation(() => {
    return Promise.resolve({
      json: () => Promise.resolve(mockArray)
    });
  });
});

describe("Rendering basics", () => {

  test("Component renders", async () => {
    await act(() => {
      render(<Store/>);
    });
  });
});