import { FC, useContext } from "react";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import userImageFallback from "../../../utils/userImageFallback";
import ModalContainer from "../ModalContainer";
import styles from "./LikesModal.module.css";
import { ThemeContext } from "../../../context/ThemeContext";

interface Props {
  toggleModal: () => void;
  data: any;
}

const LikesModal = ({ toggleModal, data }: any) => {
  const likeCount = data?.likes?.length;
  const likeCountText = () => {
    if (likeCount > 1) {
      return `${likeCount} likes`;
    } else if (likeCount === 1) {
      return "1 like";
    }
    return "0 likes";
  };
  const { theme } = useContext(ThemeContext);
  return (
    <ModalContainer title="Likes" toggleModal={toggleModal}>
      <div styleName="modal">
        <div styleName={`modal__container`}>
          <img styleName="modal__icon" src="/images/heart.png" />
          <span styleName={`modal__count modal__count--${theme}`}>{likeCountText()}</span>
        </div>
        <div styleName="modal__users">
          <ul styleName="modal__list">
            {data?.likes.map((like: any) => {
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
                  <Link
                    to={`/users/${like._id}`}
                    styleName="modal__link modal__link--user"
                  >
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
