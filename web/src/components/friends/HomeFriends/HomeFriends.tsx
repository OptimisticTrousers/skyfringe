import { useContext, useRef, MouseEvent } from "react";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import userImageFallback from "../../../utils/userImageFallback";
import { Avatar, Card } from "../../ui";
import styles from "./HomeFriends.module.css";

const HomeFriends = () => {
  const { user }: any = useContext(AuthContext);

  const carouselRef = useRef<any>(null);
  const friendCount = user.friendCount;

  const next = (event: MouseEvent<HTMLButtonElement>) => {
    if (!carouselRef.current) return;
    const containerDimensions = carouselRef.current.getBoundingClientRect();
    const containerWidth = containerDimensions.width;

    carouselRef.current.scrollLeft += containerWidth / 2;
  };

  const previous = (event: MouseEvent<HTMLButtonElement>) => {
    if (!carouselRef.current) return;
    const containerDimensions = carouselRef.current.getBoundingClientRect();
    const containerWidth = containerDimensions.width;

    carouselRef.current.scrollLeft -= containerWidth / 2;
  };

  const renderedFriends = user?.friends?.map((friend: any) => {
    return (
      <Link styleName="friends__friend" to={`/users/${friend?.userName}`}>
        <Avatar src={friend?.photo?.imageUrl} alt={"avatar"} size={"friend"} />
        <p styleName="friends__name">{friend?.fullName}</p>
      </Link>
    );
  });

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
          {renderedFriends}
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
