import { FC } from "react";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import styles from "./SearchItemResult.module.css";

interface Props {
  user: any;
  handleFocusOut: any;
}

const SearchResultItem: FC<Props> = ({ user, handleFocusOut }) => {
  return (
    <Link styleName="item" to={`/users/${user._id}`} onClick={handleFocusOut}>
      <Avatar
        src={user.photo && user.photo.imageUrl}
        alt={user.photo && user.photo.altText}
        size={"md"}
      />
      <p styleName="text">{user.fullName}</p>
    </Link>
  );
};

export default CSSModules(SearchResultItem, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
