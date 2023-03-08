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
      <div styleName="friends__container">
        <h2 styleName="friends__title">Friends</h2>
        <ul styleName="friends__cards">{children}</ul>
      </div>
    </div>
  );
};

export default CSSModules(FriendsLayout, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
