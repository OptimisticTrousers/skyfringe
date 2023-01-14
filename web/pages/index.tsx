import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { AiFillHome } from "react-icons/ai";
import CSSModules from "react-css-modules";
import { RiSearchLine } from "react-icons/ri";
import { IoIosPeople } from "react-icons/io";
import { FaShoppingBag } from "react-icons/fa";
import { RiNewspaperFill } from "react-icons/ri";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { AiFillCamera } from "react-icons/ai";
import { AiFillPicture } from "react-icons/ai";
import { AiOutlinePaperClip } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import Aside from "../components/Aside/Aside";
import CreatePost from "../components/CreatePost/CreatePost";
import Post from "../components/Post/Post";
import Suggestions from "../components/Suggestions/Suggestions";
import Recent from "../components/Recent/Recent";
import Friends from "../components/Friends/Friends";
import TopMenu from "../components/TopMenu/TopMenu";

function Home() {
  return (
    <div styleName="home">
      <div styleName="home__main">
        <div styleName="home__center">
          <div styleName="home__menu">
            <TopMenu />
          </div>
          <Friends />
          <CreatePost />
          <Post />
        </div>
        <aside styleName="home__right">
          <Suggestions />
          <Recent />
        </aside>
      </div>
    </div>
  );
}

export default CSSModules(Home, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
