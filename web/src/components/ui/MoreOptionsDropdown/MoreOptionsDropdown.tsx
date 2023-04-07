import { FC } from "react";
import CSSModules from "react-css-modules";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import useDeletePost from "../../../hooks/useDeletePost";
import useMenuCloseEvents from "../../../hooks/useMenuCloseEvents";
import styles from "./MoreOptionsDropdown.module.css";

interface Props {
  postId: string;
  closeDropdown: () => void;
}

const MoreOptionsDropdown: FC<Props> = ({ postId, closeDropdown}) => {
  const { deletePost } = useDeletePost();

  // useMenuCloseEvents("NavDropdown", closeDropdown)

  const handleDelete = () => {
    deletePost(postId);
  };
  
  return (
    <div styleName="dropdown" id="NavDropdown">
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
  );
};

export default CSSModules(MoreOptionsDropdown, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
