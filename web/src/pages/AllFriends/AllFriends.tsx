import CSSModules from "react-css-modules";
import { FriendsCard, FriendsLayout } from "../../components/friends";
import styles from "../../assets/Friends.module.css";
import { useContext } from "react";
import { AuthContext} from "../../context/AuthContext";
import { User } from "../../types";

const FriendsAll = () => {
  const { user } = useContext(AuthContext);

  const renderedFriends =
    user && user.friends ? (
      user.friends.map((friend: User) => {
        return (
          <li styleName="friend__card" key={friend._id}>
            <FriendsCard friend={friend} />
          </li>
        );
      })
    ) : (
      <li styleName="friends__message">No friends yet...</li>
    );

  return (
    <FriendsLayout>
      <section styleName="friends">
        <h2 styleName="friends__title">Friends</h2>
        <ul styleName="friends__cards">{renderedFriends}</ul>
      </section>
    </FriendsLayout>
  );
};

export default CSSModules(FriendsAll, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
