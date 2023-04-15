import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageUploadBtn from "./ImageUploadBtn";

describe("ImageUploadBtn component", () => {
  const props = {
    handleChange() {},
    setImageValue() {},
    setImageFile() {},
  };
  test("triggers the onChange handler when a file is selected", async () => {
    const user = userEvent.setup();
    const handleChangeSpy = vi.spyOn(props, "handleChange");
    const setImageValueSpy = vi.spyOn(props, "setImageValue");
    const setImageFileSpy = vi.spyOn(props, "setImageFile");

    const { handleChange, setImageValue, setImageFile } = props;

    render(
      <ImageUploadBtn
        handleChange={handleChange}
        setImageValue={setImageValue}
        setImageFile={setImageFile}
        imageValue={""}
      />
    );

    const input = screen.getByLabelText("Add picture");
    const file = new File(["test"], "optimistictrousers.jpg", {
      type: "image/jpg",
    });
    await user.upload(input, file);

    expect(handleChangeSpy).toHaveBeenCalled();
    expect(setImageValueSpy).toHaveBeenCalledWith(
      'C:\\fakepath\\optimistictrousers.jpg'
    );
    expect(setImageFileSpy).toHaveBeenCalledWith(file);
  });
});
