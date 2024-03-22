import { FC, useContext } from "react";
import CSSModules from "react-css-modules";
import FriendsAside from "../FriendsAside";
import styles from "./FriendsLayout.module.css";
import { ThemeContext } from "../../../context/ThemeContext";

interface Props {
  children: JSX.Element[] | JSX.Element;
}
// Container-type component for all variations of the friends page to provide common shared elements
const FriendsLayout: FC<Props> = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div styleName="friends">
      <FriendsAside />
      <div styleName={`friends__container friends__container--${theme}`}>{children}</div>
    </div>
  );
};

export default CSSModules(FriendsLayout, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
