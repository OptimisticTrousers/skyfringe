import { FC } from "react";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import useNotification from "../../../hooks/useNotification";
import bannerImageLoading from "../../../utils/bannerImageLoading";
import getTimeAgo from "../../../utils/getTimeAgo";
import userImageFallback from "../../../utils/userImageFallback";
import styles from "./Notification.module.css";

interface Props {
  notification: any;
  setData: any;
}

const Notification: FC<Props> = ({ notification, setData }) => {
  const { markAsRead, loading } = useNotification();
  const handleRead = () => {
    markAsRead(notification._id);
    setData((prevNotifications: any) =>
      prevNotifications.filter(
        (prevNotification: any) => prevNotification._id !== notification._id
      )
    );
  };
  return (
    <div styleName={`notification__activity ${notification?.photo && "notification__activity--has-photo"}`}>
      <div styleName="notification__container">
        <div styleName="notification__flex">
          <Link
            styleName="notification__link"
            to={`/users/${notification.fromUser?._id}`}
          >
            <img
              src={notification.fromUser?.photo?.imageUrl}
              alt={notification.fromUser?.photo?.altText}
              styleName="notification__avatar"
              onError={userImageFallback}
            />
          </Link>
          <div styleName="notification__details">
            <Link
              to={`/users/${notification.fromUser?._id}`}
              styleName="notification__name"
            >
              {notification.fromUser?.fullName}
            </Link>
            <p styleName="notification__event">
              {notification?.content}
              <span styleName={`notification__time ${notification?.content ? "notification__time--margin" : ""}`}>
                {notification?.content && "•"}{" "}
                {getTimeAgo(notification.createdAt)} ago
              </span>
            </p>
          </div>
        </div>
        {notification?.photo && (
          <img
            src={notification?.photo?.imageUrl}
            alt={notification?.photo?.altText}
            styleName="notification__image"
            onError={bannerImageLoading}
          />
        )}
      </div>
      <button styleName="notification__button" onClick={handleRead}>
        {loading ? "Marking as read..." : "Mark as read"}
      </button>
    </div>
  );
};

export default CSSModules(Notification, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
