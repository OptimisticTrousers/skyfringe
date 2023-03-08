import CSSModules from "react-css-modules"
import { FriendsCard, FriendsLayout } from "../../components/friends";
import styles from "../../styles/Friends.module.css";

const FriendsHome = () => {
  return (
    <FriendsLayout>
      <div styleName="content">
        <h2 styleName="content__title">Friends</h2> 
        <FriendsCard />
      </div>
    </FriendsLayout>
  )
}

export default CSSModules(FriendsHome, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore"
})