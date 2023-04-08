import {
  MouseEvent,
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import CSSModules from "react-css-modules";
import { AuthContext } from "../../../context/AuthContext";
import styles from "./HomeFriends.module.css";
import userImageFallback from "../../../utils/userImageFallback";
import { Link } from "react-router-dom";
import { Card } from "../../ui";

const HomeFriends = () => {
  const { user }: any = useContext(AuthContext);

  const carouselRef = useRef<any>(null);
  const friendCount = user.friendCount;

  const next = (event: MouseEvent<HTMLButtonElement>) => {
    if (!carouselRef.current) return;
    const containerDimensions = carouselRef.current.getBoundingClientRect();
    const containerWidth = containerDimensions.width;

    console.log(containerDimensions);
    carouselRef.current.scrollLeft += containerWidth / 2;
  };

  const previous = (event: MouseEvent<HTMLButtonElement>) => {
    if (!carouselRef.current) return;
    const containerDimensions = carouselRef.current.getBoundingClientRect();
    const containerWidth = containerDimensions.width;

    console.log(containerDimensions);
    carouselRef.current.scrollLeft -= containerWidth / 2;
  };

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
    <Card>
      <h2 styleName="friends__title">Friends</h2>
      <div styleName="friends">
        <button
          styleName="friends__button friends__button--previous"
          onClick={previous}
        >
          &#60;
        </button>
        <div styleName="friends__container" ref={carouselRef}>
          <Link styleName="friends__friend" to={`/users`}>
            <img
              src={`/images/optimistictrousers.jpg`}
              styleName="friends__avatar"
              onError={userImageFallback}
            />
            <p styleName="friends__name">Bob Jones 1</p>
          </Link>
          <Link styleName="friends__friend" to={`/users`}>
            <img
              src={`/images/optimistictrousers.jpg`}
              styleName="friends__avatar"
              onError={userImageFallback}
            />
            <p styleName="friends__name">Bob Jones</p>
          </Link>
          <Link styleName="friends__friend" to={`/users`}>
            <img
              src={`/images/optimistictrousers.jpg`}
              styleName="friends__avatar"
              onError={userImageFallback}
            />
            <p styleName="friends__name">Bob Jones</p>
          </Link>
          <Link styleName="friends__friend" to={`/users`}>
            <img
              src={`/images/optimistictrousers.jpg`}
              styleName="friends__avatar"
              onError={userImageFallback}
            />
            <p styleName="friends__name">Bob Jones</p>
          </Link>
          <Link styleName="friends__friend" to={`/users`}>
            <img
              src={`/images/optimistictrousers.jpg`}
              styleName="friends__avatar"
              onError={userImageFallback}
            />
            <p styleName="friends__name">Bob Jones</p>
          </Link>
          <Link styleName="friends__friend" to={`/users`}>
            <img
              src={`/images/optimistictrousers.jpg`}
              styleName="friends__avatar"
              onError={userImageFallback}
            />
            <p styleName="friends__name">Bob Jones</p>
          </Link>
          <Link styleName="friends__friend" to={`/users`}>
            <img
              src={`/images/optimistictrousers.jpg`}
              styleName="friends__avatar"
              onError={userImageFallback}
            />
            <p styleName="friends__name">Bob Jones</p>
          </Link>
          <Link styleName="friends__friend" to={`/users`}>
            <img
              src={`/images/optimistictrousers.jpg`}
              styleName="friends__avatar"
              onError={userImageFallback}
            />
            <p styleName="friends__name">Bob Jones</p>
          </Link>
          <Link styleName="friends__friend" to={`/users`}>
            <img
              src={`/images/optimistictrousers.jpg`}
              styleName="friends__avatar"
              onError={userImageFallback}
            />
            <p styleName="friends__name">Bob Jones</p>
          </Link>
          <Link styleName="friends__friend" to={`/users`}>
            <img
              src={`/images/optimistictrousers.jpg`}
              styleName="friends__avatar"
              onError={userImageFallback}
            />
            <p styleName="friends__name">Bob Jones</p>
          </Link>
          <Link styleName="friends__friend" to={`/users`}>
            <img
              src={`/images/optimistictrousers.jpg`}
              styleName="friends__avatar"
              onError={userImageFallback}
            />
            <p styleName="friends__name">Bob Jones</p>
          </Link>
          <Link styleName="friends__friend" to={`/users`}>
            <img
              src={`/images/optimistictrousers.jpg`}
              styleName="friends__avatar"
              onError={userImageFallback}
            />
            <p styleName="friends__name">Bob Jones</p>
          </Link>
          <Link styleName="friends__friend" to={`/users`}>
            <img
              src={`/images/optimistictrousers.jpg`}
              styleName="friends__avatar"
              onError={userImageFallback}
            />
            <p styleName="friends__name">Bob Jones</p>
          </Link>
          <Link styleName="friends__friend" to={`/users`}>
            <img
              src={`/images/optimistictrousers.jpg`}
              styleName="friends__avatar"
              onError={userImageFallback}
            />
            <p styleName="friends__name">Bob Jones</p>
          </Link>
          <Link styleName="friends__friend" to={`/users`}>
            <img
              src={`/images/optimistictrousers.jpg`}
              styleName="friends__avatar"
              onError={userImageFallback}
            />
            <p styleName="friends__name">Bob Jones</p>
          </Link>
          <Link styleName="friends__friend" to={`/users`}>
            <img
              src={`/images/optimistictrousers.jpg`}
              styleName="friends__avatar"
              onError={userImageFallback}
            />
            <p styleName="friends__name">Bob Jones</p>
          </Link>
          <Link styleName="friends__friend" to={`/users`}>
            <img
              src={`/images/optimistictrousers.jpg`}
              styleName="friends__avatar"
              onError={userImageFallback}
            />
            <p styleName="friends__name">Bob Jones</p>
          </Link>
          <Link styleName="friends__friend" to={`/users`}>
            <img
              src={`/images/optimistictrousers.jpg`}
              styleName="friends__avatar"
              onError={userImageFallback}
            />
            <p styleName="friends__name">Bob Jones</p>
          </Link>
          <Link styleName="friends__friend" to={`/users`}>
            <img
              src={`/images/optimistictrousers.jpg`}
              styleName="friends__avatar"
              onError={userImageFallback}
            />
            <p styleName="friends__name">Bob Jones</p>
          </Link>
          <Link styleName="friends__friend" to={`/users`}>
            <img
              src={`/images/optimistictrousers.jpg`}
              styleName="friends__avatar"
              onError={userImageFallback}
            />
            <p styleName="friends__name">Bob Jones</p>
          </Link>
          <Link styleName="friends__friend" to={`/users`}>
            <img
              src={`/images/optimistictrousers.jpg`}
              styleName="friends__avatar"
              onError={userImageFallback}
            />
            <p styleName="friends__name">Bob Jones</p>
          </Link>
          <Link styleName="friends__friend" to={`/users`}>
            <img
              src={`/images/optimistictrousers.jpg`}
              styleName="friends__avatar"
              onError={userImageFallback}
            />
            <p styleName="friends__name">Bob Jones</p>
          </Link>
          <Link styleName="friends__friend" to={`/users`}>
            <img
              src={`/images/optimistictrousers.jpg`}
              styleName="friends__avatar"
              onError={userImageFallback}
            />
            <p styleName="friends__name">Bob Jones</p>
          </Link>
          <Link styleName="friends__friend" to={`/users`}>
            <img
              src={`/images/optimistictrousers.jpg`}
              styleName="friends__avatar"
              onError={userImageFallback}
            />
            <p styleName="friends__name">Bob Jones</p>
          </Link>
          <Link styleName="friends__friend" to={`/users`}>
            <img
              src={`/images/optimistictrousers.jpg`}
              styleName="friends__avatar"
              onError={userImageFallback}
            />
            <p styleName="friends__name">Bob Jones</p>
          </Link>
          <Link styleName="friends__friend" to={`/users`}>
            <img
              src={`/images/optimistictrousers.jpg`}
              styleName="friends__avatar"
              onError={userImageFallback}
            />
            <p styleName="friends__name">Bob Jones</p>
          </Link>
        </div>
        <button
          styleName="friends__button friends__button--next"
          onClick={next}
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
