import CSSModules from "react-css-modules";
import { Card } from "../../ui";
import styles from "../../../styles/Friends.module.css";

const CurrentFriends = () => {
  return (
    <div styleName="friend" id="current">
      <Card>
        <h2 styleName="friend__title">Current Friends</h2>
        <div styleName="friend__flex">
          <div styleName="friend__details">
            <img
              src="/images/optimistictrousers.jpg"
              styleName="friend__avatar"
            />
            <p styleName="friend__name">Bob Jones</p>
          </div>
          <button styleName="friend__button">Remove</button>
        </div>
        <div styleName="friend__flex">
          <div styleName="friend__details">
            <img
              src="/images/optimistictrousers.jpg"
              styleName="friend__avatar"
            />
            <p styleName="friend__name">Bob Jones</p>
          </div>
          <button styleName="friend__button">Remove</button>
        </div>
      </Card>
    </div>
  );
};

export default CSSModules(CurrentFriends, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
