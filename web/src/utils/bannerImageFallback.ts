import { SyntheticEvent } from "react";

const bannerImageFallback = (event: SyntheticEvent) => {
  const imgElement = event.target as HTMLImageElement;
  imgElement.src = "/images/snow.jpeg";
  imgElement.alt = "Default snow banner";
};

export default bannerImageFallback;
