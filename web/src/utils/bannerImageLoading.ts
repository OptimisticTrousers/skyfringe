import { SyntheticEvent } from "react";

const bannerImageLoading = (event: SyntheticEvent) => {
  const imgElement = event.target as HTMLImageElement;
  imgElement.src = "/images/loading.jpeg";
  imgElement.alt = "Default loading banner";
};

export default bannerImageLoading;
