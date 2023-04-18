import { FC, useState } from "react";
import CSSModules from "react-css-modules";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useKeyboardNavigation } from "../../../hooks/useKeyboardNavigation";
import useMenuCloseEvents from "../../../hooks/useMenuCloseEvents";
import { DeletePostModal, EditPostModal } from "../../modals";
import styles from "./MoreOptionsDropdown.module.css";

interface Props {
  post: any;
  closeDropdown: () => void;
  toggleDropdown: () => void;
  isDropdownOpen: boolean;
  handleEditPost: any;
  handleDeletePost: any;
}

const MoreOptionsDropdown: FC<Props> = ({
  post,
  closeDropdown,
  toggleDropdown,
  isDropdownOpen,
  handleDeletePost,
  handleEditPost
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const dropdownId = "NavDropdown";
  const buttonId = "BtnDropdown";

  useKeyboardNavigation(dropdownId);
  useMenuCloseEvents(dropdownId, buttonId, closeDropdown);

  const toggleDeleteModal = () => {
    setShowDeleteModal((prevValue) => !prevValue);
  };

  const toggleEditModal = () => {
    setShowEditModal((prevValue) => !prevValue);
  };

  return (
    <div styleName="container">
      <button
        aria-controls={dropdownId}
        aria-haspopup="true"
        aria-expanded={isDropdownOpen}
        aria-label="Open post options menu"
        styleName="button"
        onClick={toggleDropdown}
        id={buttonId}
      >
        <BsThreeDotsVertical styleName="icon" />
      </button>
      <ul
        styleName={`dropdown ${!isDropdownOpen && "dropdown--invisible"}`}
        id={dropdownId}
        role="menu"
        aria-label="Post options"
      >
        <li role="none" styleName="dropdown__triangle"></li>
        <li role="none" styleName="dropdown__item">
          <button
            aria-haspopup="dialog"
            role="menuitem"
            styleName="dropdown__button"
            onClick={toggleEditModal}
          >
            <MdModeEdit styleName="dropdown__icon" />
            Edit post
          </button>
        </li>
        <li role="none" styleName="dropdown__item">
          <button
            aria-haspopup="dialog"
            role="menuitem"
            styleName="dropdown__button"
            onClick={toggleDeleteModal}
          >
            <RiDeleteBin5Line styleName="dropdown__icon" />
            Delete post
          </button>
        </li>
      </ul>
      {showDeleteModal && (
        <DeletePostModal toggleModal={toggleDeleteModal} postId={post._id} handleDeletePost={handleDeletePost}/>
      )}
      {showEditModal && (
        <EditPostModal toggleModal={toggleEditModal} post={post} handleEditPost={handleEditPost}/>
      )}
    </div>
  );
};

export default CSSModules(MoreOptionsDropdown, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
