import { FC, useState } from "react";
import CSSModules from "react-css-modules";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import useDeletePost from "../../../hooks/useDeletePost";
import useMenuCloseEvents from "../../../hooks/useMenuCloseEvents";
import { DeleteAccountModal } from "../../modals";
import DeletePostModal from "../../modals/DeletePostModal";
import styles from "./MoreOptionsDropdown.module.css";

interface Props {
  postId: string;
  closeDropdown: () => void;
  toggleDropdown: () => void;
  isDropdownOpen: boolean;
}

const MoreOptionsDropdown: FC<Props> = ({
  postId,
  closeDropdown,
  toggleDropdown,
  isDropdownOpen,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const dropdownId = "NavDropdown";
  const buttonId = "BtnDropdown";

  useMenuCloseEvents(dropdownId, buttonId, closeDropdown);

  const toggleDeleteModal = () => {
    setShowDeleteModal((prevValue) => !prevValue);
  };

  return (
    <>
      <button styleName="button" onClick={toggleDropdown} id={buttonId}>
        <BsThreeDotsVertical styleName="icon" />
      </button>
      <div
        styleName={`dropdown ${!isDropdownOpen && "dropdown--invisible"}`}
        id={dropdownId}
      >
        <div styleName="dropdown__triangle"></div>
        <button styleName="dropdown__button">
          <MdModeEdit styleName="dropdown__icon" />
          Edit post
        </button>
        <button styleName="dropdown__button" onClick={toggleDeleteModal}>
          <RiDeleteBin5Line styleName="dropdown__icon" />
          Delete post
        </button>
      </div>
      {showDeleteModal && (
        <DeletePostModal toggleModal={toggleDeleteModal} postId={postId} />
      )}
    </>
  );
};

export default CSSModules(MoreOptionsDropdown, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
