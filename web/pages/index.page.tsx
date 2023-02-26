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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token: any = context.req.cookies["jwt"];
  console.log(token)

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/current`,
    {
      headers: {
        cookie: token,
      },
    }
  );

  const data = await response.json();
  console.log(data)

  if (!data.hasOwnProperty("user")) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

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
