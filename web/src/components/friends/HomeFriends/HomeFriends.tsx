import { UserWithStringId as User } from "@backend/types";
import { useContext, useRef } from "react";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { Avatar, Card } from "../../ui";
import styles from "./HomeFriends.module.css";
import { ThemeContext } from "../../../context/ThemeContext";

const HomeFriends = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const carouselRef = useRef<HTMLDivElement>(null);

  const next = () => {
    if (!carouselRef.current) return;
    const containerDimensions = carouselRef.current.getBoundingClientRect();
    const containerWidth = containerDimensions.width;

    carouselRef.current.scrollLeft += containerWidth / 2;
  };

  const previous = () => {
    if (!carouselRef.current) return;
    const containerDimensions = carouselRef.current.getBoundingClientRect();
    const containerWidth = containerDimensions.width;

    carouselRef.current.scrollLeft -= containerWidth / 2;
  };

  return (
    <Card>
      <h2 styleName="friends__title">Friends</h2>
      <div styleName="friends">
        {user.friends?.length > 0 ? (
          <>
            <button
              styleName={`friends__button friends__button--previous friends__button--${theme}`}
              onClick={previous}
              aria-label="Scroll left"
            >
              &#60;
            </button>
            <div role="list" styleName="friends__container" ref={carouselRef}>
              {user.friends?.map((friend: User) => {
                return (
                  <Link
                    key={friend._id}
                    styleName="friends__friend"
                    to={`/users/${friend._id}`}
                  >
                    <Avatar
                      src={friend.photo && friend.photo.imageUrl}
                      alt={"avatar"}
                      size={"friend"}
                    />
                    <p styleName="friends__name">{friend.fullName}</p>
                  </Link>
                );
              })}
            </div>
            <button
              styleName={`friends__button friends__button--next friends__button--${theme}`}
              onClick={next}
              aria-label="Scroll right"
            >
              &#62;
            </button>
          </>
        ) : (
          <p styleName="friends__message">No friends yet...</p>
        )}
      </div>
    </Card>
  );
};

export default CSSModules(HomeFriends, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
