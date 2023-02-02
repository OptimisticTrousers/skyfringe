import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "../login.page";

describe("Login page", () => {
  test("renders correct heading", () => {
    const { getByRole } = render(<Login />);
    const logo = screen.getByText(/Skyfringe/i)
    expect(logo.textContent).toMatch(/Skyfringe/i);
  });
  test("password visiblity", () => {
    const {getByRole} = render(<Login />)
    const visibleButton = screen.getByRole("button", {pressed: true})
    const invisibleButton = screen.getByRole("button", {pressed: false})
  })
});
