import React from "react";
import CSSModules from "react-css-modules";
import styles from "./MoreOptionsDropdown.module.css";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

const MoreOptionsDropdown = () => {
  return (
    <div styleName="dropdown">
      <div styleName="dropdown__triangle"></div>
      <button styleName="dropdown__button">
        <MdModeEdit styleName="dropdown__icon" />
        Edit post
      </button>
      <button styleName="dropdown__button">
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
