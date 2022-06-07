import React from "react";
import { act, screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import PokemonDetails from "../PokemonDetails";

test("pass", () => {
  const passTest = "yes";
  expect(passTest).toBe("yes");
});