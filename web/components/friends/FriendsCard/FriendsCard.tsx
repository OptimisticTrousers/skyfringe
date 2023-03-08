import Link from "next/link";
import CSSModules from "react-css-modules";
import styles from "./FriendsCard.module.css";

const FriendsCard = () => {
  return (
    <div styleName="card">
      <div styleName="card__container">
        <Link styleName="card__link card__link--image" href="/bob">
          <img styleName="card__image" src="https://res.cloudinary.com/dy2ycpgo4/image/upload/v1650335621/odinbook/nyjp0jkji4fbozpyrjy1.jpg" />
        </Link>
        <div styleName="card__content">
          <Link styleName="card__link card__link--name" href="/bob">Bob Jones</Link>
          <button styleName="card__button">Unfriend</button>
        </div>
      </div>
    </div>
  );
};

export default CSSModules(FriendsCard, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
