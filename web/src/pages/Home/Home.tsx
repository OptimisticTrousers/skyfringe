import CSSModules from "react-css-modules";
import { HomeFriends } from "../../components/friends";
import { TopMenu, Suggestions, SideFooter } from "../../components/home";
import { CreatePost, Feed } from "../../components/posts";
import useFetch from "../../hooks/useFetch";
import styles from "./Home.module.css";

const Home = () => {
  const {
    setData: setFeed,
    data: posts,
    loading,
    error,
  }: any = useFetch(`${import.meta.env.VITE_API_DOMAIN}/posts`);
  return (
    <>
      <div styleName="home">
        <div styleName="home__center">
          <div styleName="home__menu">
            <TopMenu />
          </div>
          <HomeFriends />
          <CreatePost setFeed={setFeed}/>
          <Feed setFeed={setFeed} loading={loading} error={error} posts={posts}/>
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
