import React from "react";
import CSSModules from "react-css-modules";
import styles from "./Post.module.css";
import { BiTime } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { FaShareSquare } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { TbArrowForward } from "react-icons/tb";
import { RiArrowUpFill } from "react-icons/ri";
import { RiArrowDownFill } from "react-icons/ri";
import Card from "../Card/Card";

const Post = () => {
  return (
    <Card>
      <div styleName="post__top">
        <div styleName="post__container">
          <img src="optimistictrousers.jpg" styleName="post__avatar" />
          <div styleName="post__details">
            <h3 styleName="post__author">Lucky Andreas</h3>
            <p styleName="post__date">
              <BiTime />
              <span styleName="post__time">12 minutes ago</span>
            </p>
          </div>
        </div>
        <div styleName="post__actions">
          <BsBookmark styleName="post__icon post__icon--bookmark" />
          <BsThreeDotsVertical styleName="post__icon post__icon--threedots" />
        </div>
      </div>
      <div styleName="post__content">
        <p styleName="post__description">
          What is the reason guys yesterday I uploaded same kind of content they
          approved it but when today I tried to upload they say we no longer
          accept this type of content
        </p>
        <img src="optimistictrousers.jpg" styleName="post__image" />
      </div>
      <div styleName="post__controls">
        <div styleName="post__control">
          <AiOutlineLike styleName="post__icon post__icon--control" />
          <span styleName="post__control-name">Liked post</span>
          <span styleName="post__number">1,7 K</span>
        </div>
        <div styleName="post__control">
          <BiCommentDetail styleName="post__icon post__icon--control" />
          <span styleName="post__control-name">Comment</span>
          <span styleName="post__number">45</span>
        </div>
      </div>
      <section styleName="post__comments">
        <div styleName="post__form">
          <img
            src="optimistictrousers.jpg"
            styleName="post__avatar post__avatar--comments"
          />
          <input styleName="post__input" placeholder="What's on your mind?" />
        </div>
        <p styleName="post__comments-text">
          <span styleName="post__allcomments">
            All comments
            <IoIosArrowDown styleName="post__icon post__icon--arrow" />
          </span>
          <span styleName="post__filter">
            <span styleName="post__gray">Sort by</span>
            Most popular
          </span>
        </p>
        <div styleName="post__comment">
          <div styleName="post__container">
            <img
              src="optimistictrousers.jpg"
              styleName="post__avatar post__avatar--comment"
            />
            <div styleName="post__comment-details">
              Aditaya Cah Tegal:{" "}
              <span styleName="post__gray">
                People getting this type of rejection for AI images, or any
                images that contains ai generated content, but this is
                definitely not AI.
              </span>
              <div styleName="post__comment-actions">
                <div styleName="post__comment-reply">
                  <TbArrowForward styleName="post__icon post__icon--comment" />
                  <span styleName="post__control-name">Reply comment</span>
                  <span styleName="post__number">12</span>
                </div>
                <div styleName="post__comment-votes">
                  <div styleName="post__comment-vote">
                    <RiArrowUpFill styleName="post__icon post__icon--vote" />{" "}
                    Upvote
                  </div>
                  |
                  <div styleName="post__comment-vote">
                    <RiArrowDownFill styleName="post__icon post__icon--vote" />{" "}
                    Downvote
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <p styleName="post__view">View all comments</p>
    </Card>
  );
};

export default CSSModules(Post, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
