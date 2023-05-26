import { useContext } from "react";
import CSSModules from "react-css-modules";
import { Card, Loading, Notification } from "../../components/ui";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import useNotifications from "../../hooks/useNotifications";
import styles from "./Notifications.module.css";

const Notifications = () => {
  const { user } = useContext(AuthContext);

  const { markAllAsRead, loading: notificationsLoading } = useNotifications();

  const { data, setData, loading, error }: any = useFetch(
    `${import.meta.env.VITE_API_DOMAIN}/users/${user._id}/notifications`
  );

  const handleRead = () => {
    markAllAsRead();
    setData([]);
  };

  return (
    <div styleName="notifications">
      <Card>
        <div styleName="notifications__top">
          <h2 styleName="notifications__title">Notifications</h2>
          <button styleName="notifications__button" onClick={handleRead}>
            {loading ? "Marking all as read..." : "Mark all as read"}
          </button>
        </div>
        <div styleName="notifications__container">
          {loading && (
            <div styleName="notifications__loading">
              <Loading />
            </div>
          )}
          {data && (
            <>
              {data.map((notification: any) => {
                return (
                  <Notification
                    setData={setData}
                    key={notification._id}
                    notification={notification}
                  />
                );
              })}
            </>
          )}{" "}
          {data?.length === 0 && !loading && (
            <p styleName="notifications__message">No notifications...</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CSSModules(Notifications, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
