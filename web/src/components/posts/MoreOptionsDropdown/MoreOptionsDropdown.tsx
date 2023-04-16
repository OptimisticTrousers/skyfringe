import { FC, useState } from "react";
import CSSModules from "react-css-modules";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import useMenuCloseEvents from "../../../hooks/useMenuCloseEvents";
import { DeletePostModal, EditPostModal } from "../../modals";
import styles from "./MoreOptionsDropdown.module.css";

interface Props {
  post: any;
  closeDropdown: () => void;
  toggleDropdown: () => void;
  isDropdownOpen: boolean;
}

const MoreOptionsDropdown: FC<Props> = ({
  post,
  closeDropdown,
  toggleDropdown,
  isDropdownOpen,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const dropdownId = "NavDropdown";
  const buttonId = "BtnDropdown";

  useMenuCloseEvents(dropdownId, buttonId, closeDropdown);

  const toggleDeleteModal = () => {
    setShowDeleteModal((prevValue) => !prevValue);
  };

  const toggleEditModal = () => {
    setShowEditModal((prevValue) => !prevValue);
  };

  return (
    <ul id="PostDropdown" role="menu" aria-label="Post options">
      <button styleName="button" onClick={toggleDropdown} id={buttonId}>
        <BsThreeDotsVertical styleName="icon" />
      </button>
      <div
        styleName={`dropdown ${!isDropdownOpen && "dropdown--invisible"}`}
        id={dropdownId}
      >
        <div styleName="dropdown__triangle"></div>
        <button styleName="dropdown__button" onClick={toggleEditModal}>
          <MdModeEdit styleName="dropdown__icon" />
          Edit post
        </button>
        <button styleName="dropdown__button" onClick={toggleDeleteModal}>
          <RiDeleteBin5Line styleName="dropdown__icon" />
          Delete post
        </button>
      </div>
      {showDeleteModal && (
        <DeletePostModal toggleModal={toggleDeleteModal} postId={post._id} />
      )}
      {showEditModal && (
        <EditPostModal toggleModal={toggleEditModal} post={post} />
      )}
    </ul>
  );
};

export default CSSModules(MoreOptionsDropdown, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
