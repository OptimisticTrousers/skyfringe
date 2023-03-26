import CSSModules from "react-css-modules";
import { Card, Notification } from "../../components/ui";
import styles from "../styles/Notifications.module.css";

const Notifications = () => {
  return (
    <div styleName="notifications">
      <Card>
        <h2 styleName="notifications__title">Notifications</h2>
        <div styleName="notifications__container">
          <Notification />
          <Notification />
          <Notification />
          <Notification />
        </div>
      </Card>
    </div>
  );
};

export default CSSModules(Notifications, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
