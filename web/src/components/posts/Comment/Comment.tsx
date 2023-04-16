import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import styles from "./Comment.module.css";

const Comment = () => {
  return (
    <article styleName="comment">
      <div styleName="comment__container">
        <img
          src="/images/optimistictrousers.jpg"
          styleName="comment__avatar comment__avatar--comment"
        />
        <div styleName="comment__content">
          <div styleName="comment__details">
            <div styleName="comment__top">
              <Link styleName="comment__link" to="/">
                Aditaya Cah Tegal{" "}
              </Link>
              <span styleName="comment__gray">posted on January 24, 2022</span>
            </div>
            <p styleName="comment__text">
              People getting this type of rejection for AI images, or any images
              that contains ai generated content, but this is definitely not AI.
            </p>
          </div>
          <div styleName="comment__actions">
            <div styleName="comment__likes">
              <button styleName="comment__button comment__button--like">
                Like
              </button>
              <button styleName="comment__button comment__button--icon">
                <img
                  styleName="comment__icon comment__icon--heart"
                  src="/images/heart.png"
                />
                <span styleName="comment__count">0</span>
              </button>
            </div>
            <div styleName="comment__options">
              <button styleName="comment__button comment__button--edit">
                Edit
              </button>
              <button styleName="comment__button comment__button--delete">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CSSModules(Comment, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
