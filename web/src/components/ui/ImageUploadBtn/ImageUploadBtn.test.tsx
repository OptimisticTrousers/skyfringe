import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastContext } from "../../../context/ToastContext";
import ImageUploadBtn from "./ImageUploadBtn";

describe("ImageUploadBtn component", () => {
  let showToastMock = function showToast() {};
  const toast = {
    showToastMock,
  };
  const props = {
    handleChange() {},
    setImageValue() {},
    setImageFile() {},
    removeThumbnail() {},
  };
  test("displays error message for files that are too large", async () => {
    const user = userEvent.setup();
    const handleChangeMock = vi.fn();
    const setImageValueMock = vi.fn();
    const setImageFileMock = vi.fn();
    const removeThumbnailMock = vi.fn();
    const showToastMock = vi.fn();
    const mockImageFile = new File([""], "heart.png");
    Object.defineProperty(mockImageFile, "size", { value: 1024 * 1024 * 9 });
    render(
      <ToastContext.Provider value={{ showToast: showToastMock }}>
        <ImageUploadBtn
          handleChange={handleChangeMock}
          imageValue=""
          setImageValue={setImageValueMock}
          setImageFile={setImageFileMock}
          removeThumbnail={removeThumbnailMock}
        />
      </ToastContext.Provider>
    );
    const imageUploadButton = screen.getByLabelText("Add picture");
    await user.upload(imageUploadButton, mockImageFile);
    expect(showToastMock).toHaveBeenCalledTimes(1);
    expect(showToastMock).toHaveBeenCalledWith(
      "error",
      "File is too big. Max size is 8MB."
    );
  });
  test("sets the image file and value when a valid file is picked", async () => {
    const user = userEvent.setup();
    const handleChangeMock = vi.fn();
    const setImageValueMock = vi.fn();
    const setImageFileMock = vi.fn();
    const removeThumbnailMock = vi.fn();
    const mockImageFile = new File(["test"], "test.jpg", {
      type: "image/jpeg",
    });
    render(
      <ImageUploadBtn
        handleChange={handleChangeMock}
        imageValue=""
        setImageValue={setImageValueMock}
        setImageFile={setImageFileMock}
        removeThumbnail={removeThumbnailMock}
      />
    );
    const imageUploadButton = screen.getByLabelText("Add picture");
    await user.upload(imageUploadButton, mockImageFile);
    expect(handleChangeMock).toHaveBeenCalledTimes(1);
    expect(setImageFileMock).toHaveBeenCalledTimes(1);
    expect(setImageValueMock).toHaveBeenCalledTimes(1);
  });
});
