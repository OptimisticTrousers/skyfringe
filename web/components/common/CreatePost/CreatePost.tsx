import CSSModules from "react-css-modules";
import { FC, useState } from "react";
import { FcPlus } from "react-icons/fc";
import { Card } from "../../ui";
import styles from "./CreatePost.module.css";
import { CreatePostModal } from "../../modals";

const CreatePost = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const toggleModal = () => {
    setIsCreateModalOpen((prevValue) => !prevValue);
  };

  return (
    <>
      {isCreateModalOpen && <CreatePostModal toggleModal={toggleModal} />}
      <button styleName="create" onClick={toggleModal} aria-haspopup="dialog">
        <Card>
          <div styleName="create__container">
            <FcPlus styleName="create__icon" />
            <div styleName="create__text">
              <h3 styleName="create__title">Create a Post</h3>
              <p styleName="create__description">
                What&apos;s on your mind, Tony? Write a post or upload a
                picture!
              </p>
            </div>
          </div>
        </Card>
      </button>
    </>
  );
};

export default CSSModules(CreatePost, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
