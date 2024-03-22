import { FC, useContext } from "react";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import styles from "./SearchItemResult.module.css";
import { ThemeContext } from "../../../context/ThemeContext";

interface Props {
  user: any;
  handleFocusOut: any;
}

const SearchResultItem: FC<Props> = ({ user, handleFocusOut }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Link styleName={`item item--${theme}`} to={`/users/${user._id}`} onClick={handleFocusOut}>
      <Avatar
        src={user.photo && user.photo.imageUrl}
        alt={user.photo && user.photo.altText}
        size={"md"}
      />
      <p styleName={`text text--${theme}`}>{user.fullName}</p>
    </Link>
  );
};

export default CSSModules(SearchResultItem, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
