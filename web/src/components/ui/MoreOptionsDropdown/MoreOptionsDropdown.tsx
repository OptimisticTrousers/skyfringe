import { FC } from "react";
import CSSModules from "react-css-modules";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import useDeletePost from "../../../hooks/useDeletePost";
import useMenuCloseEvents from "../../../hooks/useMenuCloseEvents";
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
  const { deletePost } = useDeletePost(closeDropdown);

  const dropdownId = "NavDropdown";
  const buttonId = "BtnDropdown";

  useMenuCloseEvents(dropdownId, buttonId, closeDropdown);

  const handleDelete = () => {
    deletePost(postId);
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
        <button styleName="dropdown__button" onClick={handleDelete}>
          <RiDeleteBin5Line styleName="dropdown__icon" />
          Delete post
        </button>
      </div>
    </>
  );
};

export default CSSModules(MoreOptionsDropdown, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
