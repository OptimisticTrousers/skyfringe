import CSSModules from "react-css-modules";
import { useState } from "react";
import { SkeletonPost } from "../components/skeletons";
import {
  TopMenu,
  CreatePost,
  Post,
  SideFooter,
  Suggestions,
} from "../components/common";
import { CreatePostModal } from "../components/modals";
import styles from "../styles/Home.module.css";

function Home() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const toggleModal = () => {
    setIsCreateModalOpen((prevValue) => !prevValue);
  };

  return (
    <>
      <div styleName="home">
        <div styleName="home__center">
          <div styleName="home__menu">
            <TopMenu />
          </div>
          {/* <HomeFriends /> */}
          <CreatePost toggleModal={toggleModal} />
          <SkeletonPost />
          <Post />
        </div>
        <aside styleName="home__right">
          <Suggestions />
          {/* <Recent /> */}
          <SideFooter />
        </aside>
      </div>
      {isCreateModalOpen && <CreatePostModal toggleModal={toggleModal} />}
    </>
  );
}

export default CSSModules(Home, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
