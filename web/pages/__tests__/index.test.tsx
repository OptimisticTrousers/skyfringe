import React from "react";
import { render } from "@testing-library/react";
import Home from "../index.page";

describe("Home component", () => {
  test("renders correct heading", () => {
    const { getByRole } = render(<Home />);
    expect(getByRole("heading").textContent).toMatch(/our first test/i);
  });
});
