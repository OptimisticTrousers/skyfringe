import CSSModules from "react-css-modules"
import styles from "../../styles/Friends.module.css";
import FriendsLayout from "../../components/friends/FriendsLayout/FriendsLayout"

const FriendsHome = () => {
  return (
    <FriendsLayout>
      <h2>Friend Requests</h2>
    </FriendsLayout>
  )
}

export default CSSModules(FriendsHome, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore"
})