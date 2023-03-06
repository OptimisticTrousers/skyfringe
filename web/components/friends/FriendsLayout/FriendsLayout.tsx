import { FC } from "react";
import CSSModules from "react-css-modules";
import FriendsAside from "../FriendsAside/FriendsAside";
import styles from "./FriendsLayout.module.css";

interface Props {
  children: JSX.Element[] | JSX.Element;
}
// Container-type component for all variations of the friends page to provide common shared elements
const FriendsLayout: FC<Props> = ({ children }) => {
  return (
    <div styleName="friends">
      <FriendsAside />
      {children}
    </div>
  );
};

export default CSSModules(FriendsLayout, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
