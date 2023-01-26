import CSSModules from "react-css-modules";
import { FC } from "react";
import { FcPlus } from "react-icons/fc";
import { Card } from "../../ui";
import styles from "./CreatePost.module.css";

interface Props {
  toggleModal: () => void;
}

const CreatePost: FC<Props> = ({ toggleModal }) => {
  return (
    <div styleName="create" onClick={toggleModal}>
      <Card>
        <div styleName="create__container">
          <FcPlus styleName="create__icon" />
          <div styleName="create__text">
            <h3 styleName="create__title">Create a Post</h3>
            <p styleName="create__description">
              What&apos;s on your mind, Tony? Write a post or upload a picture!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CSSModules(CreatePost, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
