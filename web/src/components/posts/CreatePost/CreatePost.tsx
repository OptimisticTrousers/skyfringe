import { useContext, useState } from "react";
import CSSModules from "react-css-modules";
import { FcPlus } from "react-icons/fc";
import { AuthContext } from "../../../context/AuthContext";
import { CreatePostModal } from "../../modals";
import { Card } from "../../ui";
import styles from "./CreatePost.module.css";

const CreatePost = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { user } = useContext(AuthContext);

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
                What&apos;s on your mind, {user.userName}? Write a post or
                upload a picture!
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
