import CSSModules from "react-css-modules";
import { SkeletonPost } from "../components/skeletons";
import {
  TopMenu,
  CreatePost,
  Post,
  SideFooter,
  Suggestions,
} from "../components/common";
import styles from "../styles/Home.module.css";

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
          <SkeletonPost />
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
