import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ModalContainer from "./ModalContainer";

describe("ModalContainer component", () => {
  it("renders children and title", () => {
    render(
      <ModalContainer title="Test Modal" toggleModal={() => {}}>
        <div>Test content</div>
      </ModalContainer>
    );

    const modalTitle = screen.getByText("Test Modal");
    const modalChildren = screen.getByText("Test content");
    expect(modalTitle).toBeInTheDocument();
    expect(modalChildren).toBeInTheDocument();
  });

  it("calls toggleModal when close button is clicked", async () => {
    const toggleModalMock = vi.fn();
    const user = userEvent.setup();
    render(
      <ModalContainer title="Test Modal" toggleModal={toggleModalMock}>
        <div>Test content</div>
      </ModalContainer>
    );
    const modalButton = screen.getByLabelText("Close modal");
    await user.click(modalButton);
    expect(toggleModalMock).toHaveBeenCalled();
  });

  it("disables scrolling when mounted", () => {
    render(
      <ModalContainer title="Test Modal" toggleModal={() => {}}>
        <div>Test content</div>
      </ModalContainer>
    );

    expect(document.documentElement.style.overflow).toBe("hidden");
  });
});
