import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastContext } from "../../../context/ToastContext";
import Toast from "./Toast";

const mockSetToastVisible = vi.fn();

describe("Toast component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("is visible", () => {
    const defaultProps = {
      visible: true,
      params: {
        type: "success",
        message: "Operation successful",
      },
    };
    render(
      <ToastContext.Provider value={{ setToastVisible: mockSetToastVisible }}>
        <Toast {...defaultProps} />
      </ToastContext.Provider>
    );

    const toast = screen.getByRole("status");
    expect(toast).toBeInTheDocument();
  });

  it("is invisible, but type is 'success'", () => {
    const defaultProps = {
      visible: false,
      params: {
        type: "success",
        message: "Operation successful",
      },
    };
    render(
      <ToastContext.Provider value={{ setToastVisible: mockSetToastVisible }}>
        <Toast {...defaultProps} />
      </ToastContext.Provider>
    );

    // Since the accessible role is status, an inaccessible element will not be found here
    const toast = screen.queryByRole("status");
    expect(toast).not.toBeInTheDocument();
  });

  it("is invisible, but type is 'error'", () => {
    const defaultProps = {
      visible: false,
      params: {
        type: "error",
        message: "Operation unsuccessful",
      },
    };
    render(
      <ToastContext.Provider value={{ setToastVisible: mockSetToastVisible }}>
        <Toast {...defaultProps} />
      </ToastContext.Provider>
    );

    // Since the accessible role is status, an inaccessible element will not be found here
    const toast = screen.queryByRole("status");
    expect(toast).not.toBeInTheDocument();
  });

  it("renders correct text when type is 'success'", () => {
    const defaultProps = {
      visible: true,
      params: {
        type: "success",
        message: "Operation successful",
      },
    };
    render(
      <ToastContext.Provider value={{ setToastVisible: mockSetToastVisible }}>
        <Toast {...defaultProps} />
      </ToastContext.Provider>
    );

    const toastMessage = screen.getByText("Operation successful");

    expect(toastMessage).toBeInTheDocument();
  });

  it("renders correct text when type is 'error'", () => {
    const defaultProps = {
      visible: true,
      params: {
        type: "error",
        message: "Operation unsuccessful",
      },
    };
    render(
      <ToastContext.Provider value={{ setToastVisible: mockSetToastVisible }}>
        <Toast {...defaultProps} />
      </ToastContext.Provider>
    );

    const toastMessage = screen.getByText("Operation unsuccessful");

    expect(toastMessage).toBeInTheDocument();
  });

  it("calls setToastVisible when the close button is clicked", async () => {
    const defaultProps = {
      visible: true,
      params: {
        type: "error",
        message: "Operation unsuccessful",
      },
    };
    const user = userEvent.setup();
    render(
      <ToastContext.Provider value={{ setToastVisible: mockSetToastVisible }}>
        <Toast {...defaultProps} />
      </ToastContext.Provider>
    );

    const button = screen.getByRole("button");

    await user.click(button);

    expect(mockSetToastVisible).toHaveBeenCalledWith(false);
  });
});
