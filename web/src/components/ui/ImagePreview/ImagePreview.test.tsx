import { fireEvent, render, screen } from "@testing-library/react";
import { ToastContext } from "../../../context/ToastContext";
import ImagePreview from "./ImagePreview";

describe("ImagePreview component", () => {
  const setImageValue = vi.fn();
  const setImageFile = vi.fn();
  const removeThumbnail = vi.fn();

  it("renders the previw image correct", () => {
    const url = "https://example.com/image.png";
    render(
      <ImagePreview
        imageData={url}
        setImageValue={setImageValue}
        setImageFile={setImageFile}
        removeThumbnail={removeThumbnail}
      />
    );

    const previewImage = screen.getByAltText("Preview image");
    expect(previewImage).toHaveAttribute("src", url);
  });
  it("calls removeImage and showToast when image fails to load", () => {
    const url = "https://example.com/image.png";
    const showToast = vi.fn();
    render(
      <ToastContext.Provider value={{ showToast }}>
        <ImagePreview
          imageData={url}
          setImageValue={setImageValue}
          setImageFile={setImageFile}
          removeThumbnail={removeThumbnail}
        />
      </ToastContext.Provider>
    );

    const previewImage = screen.getByAltText("Preview image");

    fireEvent.error(previewImage);

    expect(setImageValue).toHaveBeenCalledWith("");
    expect(setImageFile).toHaveBeenCalledWith(null);
    expect(removeThumbnail).toHaveBeenCalled();
    expect(showToast).toHaveBeenCalledWith(
      "error",
      "Please upload a valid image of the type .png, .jpg, .jpeg, or .webp"
    );
  });
});
