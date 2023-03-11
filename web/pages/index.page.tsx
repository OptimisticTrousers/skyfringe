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
import { GetServerSidePropsContext } from "next";
import { Post as PostInterface } from "../types";
import { FC } from "react";
import useCurrentUser from "../hooks/useCurrentUser";

// export async function getServerSideProps() {
//   const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/posts`);
//   const { posts } = await response.json();

//   return {
//     props: {
//       posts,
//     },
//   };
// }

interface Props {
  posts: PostInterface[];
}

const Home = () => {
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
          {/* {renderedPosts}; */}
        </div>
        <aside styleName="home__right">
          <Suggestions />
          {/* <Recent /> */}
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
