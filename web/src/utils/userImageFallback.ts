import { SyntheticEvent } from "react";

const userImageFallback = (event: SyntheticEvent) => {
  const imgElement = event.target as HTMLImageElement;
  imgElement.src = "/images/anon-user-lg.png";
  imgElement.alt = "Anonymous user avatar";
};

export default userImageFallback;
