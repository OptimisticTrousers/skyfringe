import { SyntheticEvent } from "react";

const postImageFallback = (event: SyntheticEvent) => {
  const imgElement = event.target as HTMLImageElement;
  // Hide the image if the src is invalid 
  imgElement.style.display = "none";
};

export default postImageFallback;
