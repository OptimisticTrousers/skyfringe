import Link from "next/link";
import CSSModules from "react-css-modules"
import styles from "./FriendsCard.module.css";

const FriendsCard = () =>{
  <li styleName="card">
    <div styleName="card__container">
      <Link href="/bob">
        <img src="https://res.cloudinary.com/dy2ycpgo4/image/upload/v1650335621/odinbook/nyjp0jkji4fbozpyrjy1.jpg" />
      </Link>
      <div styleName="card__content">
        <Link href="/bob">
          Bob Jones
        </Link>
        <button styleName="card__button">Unfriend</button>
      </div>
    </div>
  </li>
}

export default CSSModules(FriendsCard, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore"
})