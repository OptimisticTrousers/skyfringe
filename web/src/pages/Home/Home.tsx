import CSSModules from "react-css-modules";
import { HomeFriends } from "../../components/friends";
import { TopMenu, Suggestions, SideFooter } from "../../components/home";
import { CreatePost, Feed } from "../../components/posts";
import styles from "./Home.module.css";

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
