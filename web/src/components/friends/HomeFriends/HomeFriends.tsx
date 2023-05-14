import { FetchFriendsResponse, UserWithStringId as User } from "@backend/types";
import { useContext, useRef } from "react";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import useFetch from "../../../hooks/useFetch";
import { Avatar, Card, ErrorMessage, Loading } from "../../ui";
import styles from "./HomeFriends.module.css";

const HomeFriends = () => {
  const { user } = useContext(AuthContext);

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
        <button
          styleName="friends__button friends__button--previous"
          onClick={previous}
          aria-label="Scroll left"
        >
          &#60;
        </button>
        <div role="list" styleName="friends__container" ref={carouselRef}>
          {user? 
            user.friends.map((friend: User) => {
              return (
                <Link
                  key={friend._id}
                  styleName="friends__friend"
                  to={`/users/${friend.userName}`}
                >
                  <Avatar
                    src={friend.photo && friend.photo.imageUrl}
                    alt={"avatar"}
                    size={"friend"}
                  />
                  <p styleName="friends__name">{friend.fullName}</p>
                </Link>
              );
            }) : (
              <div>ok</div>
            )}
        </div>
        <button
          styleName="friends__button friends__button--next"
          onClick={next}
          aria-label="Scroll right"
        >
          &#62;
        </button>
      </div>
    </Card>
  );
};

export default CSSModules(HomeFriends, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
