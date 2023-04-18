import { FC } from "react";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import userImageFallback from "../../../utils/userImageFallback";
import ModalContainer from "../ModalContainer";
import styles from "./LikesModal.module.css";

interface Props {
  toggleModal: () => void;
  post: any;
}

const LikesModal = ({ toggleModal, post }: any) => {
  const likeCount = post.likes.length;
  return (
    <ModalContainer title="Likes" toggleModal={toggleModal}>
      <div styleName="modal">
        <div styleName="modal__container">
          <img styleName="modal__icon" src="/images/heart.png" />
          <span styleName="modal__count">
            {likeCount === 0 && "0 likes"}
            {likeCount === 1 && "1 like"}
            {likeCount > 1 && `${likeCount} likes`}
          </span>
        </div>
        <div styleName="modal__users">
          <ul styleName="modal__list">
            {post.likes.map((like: any) => {
              return (
                <li styleName="modal__item" key={like._id} role="menuitem">
                  <Link
                    to={`/users/${like._id}`}
                    styleName="modal__link modal__link--avatar"
                  >
                    <img
                      styleName="modal__avatar"
                      src={like?.photo?.imageUrl || "/images/anon-user-lg.png"}
                      alt={like?.photo?.altText || "Anonymous user avatar"}
                    />
                  </Link>
                  <Link to="/bob" styleName="modal__link modal__link--user">
                    {like.fullName}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </ModalContainer>
  );
};

export default CSSModules(LikesModal, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
