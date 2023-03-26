import { FC } from "react";
import CSSModules from "react-css-modules";
import styles from "./Logo.module.css";

interface Props {
  type: string;
}

const Logo: FC<Props> = ({ type }) => {
  let logoStyle = "";
  let imageStyle = "";

  switch (type) {
    case "lg":
      logoStyle = "logo__name--large";
      imageStyle = "logo__image--large";
      break;
    case "sm":
      logoStyle = "logo__name--small";
      imageStyle = "logo__image--small";
      break;
    default:
      break;
  }

  return (
    <div styleName="logo">
      <h1 styleName={`logo__name ${logoStyle}`}>
        <img styleName={`logo__image ${imageStyle}`} src="/svgs/logo.svg" />
        Skyfringe
      </h1>
    </div>
  );
};

export default CSSModules(Logo, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
