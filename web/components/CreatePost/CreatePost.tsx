import React from "react";
import CSSModules from "react-css-modules";
import {
  AiFillCamera,
  AiFillPicture,
  AiOutlinePaperClip,
} from "react-icons/ai";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import styles from "./CreatePost.module.css";

const CreatePost = () => {
  return (
    <div styleName="create">
      <div styleName="create__top">
        <img src="optimistictrousers.jpg" styleName="create__image" />
        <input styleName="create__input" placeholder="What's on your mind?" />
      </div>
      <div styleName="create__bottom">
        <div styleName="create__icons">
          <AiFillCamera styleName="create__icon" />
          <AiFillPicture styleName="create__icon" />
          <AiOutlinePaperClip styleName="create__icon" />
          <MdLocationOn styleName="create__icon" />
          <BsFillEmojiSmileFill styleName="create__icon" />
        </div>
        <button styleName="create__button">Post</button>
      </div>
    </div>
  );
};

export default CSSModules(CreatePost, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
