import styles from "../styles/Home.module.css";
import CSSModules from "react-css-modules";
import CreatePost from "../components/CreatePost/CreatePost";
import Post from "../components/Post/Post";
import Suggestions from "../components/Suggestions/Suggestions";
import HomeFriends from "../components/HomeFriends/HomeFriends";
import TopMenu from "../components/TopMenu/TopMenu";
import SideFooter from "../components/SideFooter/SideFooter";
import Modal from "../components/Modal/Modal";

function Home() {

  return (
    <>
      <div styleName="home">
        <div styleName="home__center">
          <div styleName="home__menu">
            <TopMenu />
          </div>
          {/* <HomeFriends /> */}
          <CreatePost />
          <Post />
        </div>
        <aside styleName="home__right">
          <Suggestions />
          {/* <Recent /> */}
          <SideFooter />
        </aside>
      </div>
    </>
  );
}

export default CSSModules(Home, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
