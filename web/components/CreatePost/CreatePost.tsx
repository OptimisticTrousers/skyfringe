import React from "react";
import CSSModules from "react-css-modules";
import { AiOutlinePicture } from "react-icons/ai";
import styles from "./CreatePost.module.css";
import { BsEmojiHeartEyes } from "react-icons/bs";
import Card from "../Card/Card";

const CreatePost = () => {
  return (
    <Card>
      <div styleName="create__top">
        <img src="optimistictrousers.jpg" styleName="create__image" />
        <input styleName="create__input" placeholder="What's on your mind?" />
      </div>
      <div styleName="create__bottom">
        <div styleName="create__icons">
          <AiOutlinePicture styleName="create__icon" />
          <BsEmojiHeartEyes styleName="create__icon" />
        </div>
        <button styleName="create__button">Post</button>
      </div>
    </Card>
  );
};

export default CSSModules(CreatePost, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
