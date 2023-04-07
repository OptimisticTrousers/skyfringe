import CSSModules from "react-css-modules";
import styles from "./Home.module.css";
import {
  TopMenu,
  CreatePost,
  Suggestions,
  SideFooter,
  Feed,
} from "../../components/common";
import { HomeFriends } from "../../components/friends";

const Home = () => {
  return (
    <>
      <div styleName="home">
        <div styleName="home__center">
          <div styleName="home__menu">
            <TopMenu />
          </div>
          <HomeFriends />
          <CreatePost />
          <Feed />
        </div>
        <aside styleName="home__right">
          <Suggestions />
          <SideFooter />
        </aside>
      </div>
    </>
  );
};

export default CSSModules(Home, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
