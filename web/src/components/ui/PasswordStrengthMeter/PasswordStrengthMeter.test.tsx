import { render, screen } from "@testing-library/react";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

describe("PasswordStrengthMeter component", () => {
  // Arbitrary passwords chosen from https://zxcvbn-ts.github.io/zxcvbn/guide/comparison/
  const weak = "Daniel";
  const fair = "1234qwe2ad";
  const good = "Tiger@01771";
  const strong = "dgo9dsghasdoghi8/!&IT/§(ihsdhf8o7o";
  it(`displays 'Weak' for password ${weak}`, async () => {
    render(<PasswordStrengthMeter password={weak} />);
    expect(await screen.findByText("Weak")).toBeInTheDocument();
  });

  it(`displays 'Fair' for password ${fair}`, async () => {
    render(<PasswordStrengthMeter password={fair} />);
    expect(await screen.findByText("Fair")).toBeInTheDocument();
  });

  it(`displays 'Good' for password ${good}`, async () => {
    render(<PasswordStrengthMeter password={good} />);
    expect(await screen.findByText("Good")).toBeInTheDocument();
  });

  it(`displays 'Strong' for password ${strong}`, async () => {
    render(<PasswordStrengthMeter password={strong} />);
    expect(await screen.findByText("Strong")).toBeInTheDocument();
  });
});
