import { useContext } from "react";
import CSSModules from "react-css-modules";
import { AuthContext } from "../../../context/AuthContext";
import styles from "./HomeFriends.module.css";
import userImageFallback from "../../../utils/userImageFallback";
import { Link } from "react-router-dom";

const HomeFriends = () => {
  const { user }: any = useContext(AuthContext);

  const renderedFriends = user.friends.map((friend: any) => {
    return (
      <Link styleName="friends__friend" to={`/users/${friend.userName}`}>
        <img
          src={`${import.meta.env.VITE_S3_BUCKET}/${friend.userName}.webp`}
          styleName="friends__avatar"
          onError={userImageFallback}
        />
        <p styleName="friends__name">{friend.fullName}</p>
      </Link>
    );
  });

  return (
    <div styleName="friends">
      <button className="carousel-btn prev">&#60;</button>
      {renderedFriends}
      <button className="carousel-btn next">&#62;</button>
    </div>
  );
};

export default CSSModules(HomeFriends, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
