import CSSModules from "react-css-modules";
import { useContext } from "react";
import { Post } from "../../components/common";
import { Card } from "../../components/ui";
import styles from "./Profile.module.css";
import { AuthContext } from "../../context/AuthContext";
import { useFetch } from "../../hooks/useFetch";
import useErrorToast from "../../hooks/useErrorToast";
import { SkeletonPost } from "../../components/skeletons";
import { Post as PostInterface } from "./../../types";
import { ErrorMessage } from "../../components/ui/ErrorMessage";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const {
    data: posts,
    loading,
    error,
  }: any = useFetch(
    `${import.meta.env.VITE_API_DOMAIN}/users/${user!._id}/posts`
  );
  useErrorToast(error as Error);

  console.log(posts)

  return (
    user && (
      <div styleName="profile">
        <header styleName="profile__header">
          <img
            src="/images/optimistictrousers.jpg"
            styleName="profile__image"
          />
          <div styleName="profile__details">
            <img
              src="/images/optimistictrousers.jpg"
              styleName="profile__avatar"
            />
            <div styleName="profile__text">
              <h2 styleName="profile__name">{user.fullName}</h2>
              <h3 styleName="profile__username">@{user.userName}</h3>
            </div>
          </div>
        </header>
        <div styleName="profile__content">
          <aside styleName="profile__aside">
            <Card>
              <div styleName="profile__card">
                <h3 styleName="profile__subtitle">About</h3>
                <p styleName="profile__description">
                  {user.bio ? user.bio : "Add a bio..."}
                </p>
              </div>
            </Card>
            <Card>
              <div styleName="profile__card">
                <h3 styleName="profile__subtitle">Media</h3>
                <div styleName="profile__friends">
                  <img
                    src="/images/optimistictrousers.jpg"
                    styleName="profile__friend"
                  />
                  <img
                    src="/images/optimistictrousers.jpg"
                    styleName="profile__friend"
                  />
                  <img
                    src="/images/optimistictrousers.jpg"
                    styleName="profile__friend"
                  />
                  <img
                    src="/images/optimistictrousers.jpg"
                    styleName="profile__friend"
                  />
                  <img
                    src="/images/optimistictrousers.jpg"
                    styleName="profile__friend"
                  />
                  <img
                    src="/images/optimistictrousers.jpg"
                    styleName="profile__friend"
                  />
                  <img
                    src="/images/optimistictrousers.jpg"
                    styleName="profile__friend"
                  />
                  <img
                    src="/images/optimistictrousers.jpg"
                    styleName="profile__friend"
                  />
                  <img
                    src="/images/optimistictrousers.jpg"
                    styleName="profile__friend"
                  />
                </div>
              </div>
            </Card>
            <Card>
              <div styleName="profile__card">
                <div styleName="profile__container">
                  <div styleName="profile__text">
                    <h3 styleName="profile__subtitle">Friends</h3>
                    <p styleName="profile__caption">
                      {user.friendCount} friends
                    </p>
                  </div>
                  <a styleName="profile__link">See all friends</a>
                </div>
                <div styleName="profile__friends">
                  <img
                    src="/images/optimistictrousers.jpg"
                    styleName="profile__friend"
                  />
                  <img
                    src="/images/optimistictrousers.jpg"
                    styleName="profile__friend"
                  />
                  <img
                    src="/images/optimistictrousers.jpg"
                    styleName="profile__friend"
                  />
                  <img
                    src="/images/optimistictrousers.jpg"
                    styleName="profile__friend"
                  />
                  <img
                    src="/images/optimistictrousers.jpg"
                    styleName="profile__friend"
                  />
                  <img
                    src="/images/optimistictrousers.jpg"
                    styleName="profile__friend"
                  />
                  <img
                    src="/images/optimistictrousers.jpg"
                    styleName="profile__friend"
                  />
                  <img
                    src="/images/optimistictrousers.jpg"
                    styleName="profile__friend"
                  />
                  <img
                    src="/images/optimistictrousers.jpg"
                    styleName="profile__friend"
                  />
                </div>
              </div>
            </Card>
          </aside>
          <div styleName="profile__main">
            <ul styleName="profile__list">
              <li styleName="profile__item">Your posts</li>
              <li styleName="profile__item">Liked posts</li>
              <li styleName="profile__item">Saved posts</li>
            </ul>
            <div styleName="profile__posts">
              {loading && (
                <>
                  <SkeletonPost />
                  <SkeletonPost />
                  <SkeletonPost />
                  <SkeletonPost />
                  <SkeletonPost />
                </>
              )}
              {posts && (
                <div>
                  {posts.map((post: PostInterface) => {
                    return <Post post={post} key={post._id} />;
                  })}
                </div>
              )}
              {error && <ErrorMessage message={error} />}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CSSModules(Profile, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
