import React from "react";
import CSSModules from "react-css-modules";
import Card from "../Card/Card";
import styles from "../../styles/Friends.module.css";

const FindFriends = () => {
  return (
    <div styleName="friend" id="find">
      <Card>
        <h2 styleName="friend__title">All Other Users = make new friends!</h2>
        <input styleName="friend__input" placeholder="Search Users" />
        <div styleName="friend__flex">
          <div styleName="friend__details">
            <img
              src="/images/optimistictrousers.jpg"
              styleName="friend__avatar"
            />
            <p styleName="friend__name">Bob Jones</p>
          </div>
          <button styleName="friend__button">Send Friend Request</button>
        </div>
      </Card>
    </div>
  );
};

export default CSSModules(FindFriends, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
