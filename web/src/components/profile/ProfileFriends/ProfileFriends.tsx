import { FC } from "react";
import CSSModules from "react-css-modules";
import { Card } from "../../ui";
import ProfileFriend from "../ProfileFriend/ProfileFriend";
import styles from "./ProfileFriends.module.css";

interface Props {
  friends: any;
}

const ProfileFriends: FC<Props> = ({ friends }) => {
  return (
    <section styleName="friends">
      <Card>
        <div styleName="friends__container">
          <div styleName="friends__top">
            <h2 styleName="friends__title">Friends</h2>
          </div>
          <ul styleName="friends__list">
            {friends.length > 0 ? (
              friends?.map((friend: any) => {
                return <ProfileFriend friend={friend} />;
              })
            ) : (
              <p styleName="friends__message">No friends yet...</p>
            )}
          </ul>
        </div>
      </Card>
    </section>
  );
};

export default CSSModules(ProfileFriends, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
