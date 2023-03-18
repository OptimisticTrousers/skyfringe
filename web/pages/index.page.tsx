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
import { HomeFriends } from "../components/friends";
import { getSession, useSession } from "next-auth/react";

interface Props {
  posts: PostInterface[];
}

const Home: FC<Props> = ({ posts }) => {
  const renderedPosts = posts.map((post) => {
    return <Post key={post._id} post={post} />;
  });

  return (
    <>
      <div styleName="home">
        <div styleName="home__center">
          <div styleName="home__menu">
            <TopMenu />
          </div>
          <HomeFriends />
          <CreatePost />
          {/* <SkeletonPost /> */}
          {renderedPosts}
        </div>
        <aside styleName="home__right">
          <Suggestions />
          <SideFooter />
        </aside>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/posts`, {
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    credentials: "include",
  });
  const { posts } = await response.json();

  if (!posts) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts,
    },
  };
}

export default CSSModules(Home, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
