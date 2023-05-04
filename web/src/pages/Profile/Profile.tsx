import { useContext, useEffect, useState } from "react";
import CSSModules from "react-css-modules";
import { Post } from "../../components/posts";
import { SkeletonPost } from "../../components/skeletons";
import { Avatar, Banner, Card, ErrorMessage } from "../../components/ui";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { Post as PostInterface } from "./../../types";
import styles from "./Profile.module.css";
import { Link, useParams } from "react-router-dom";
import { SideFooter } from "../../components/home";

const Profile = () => {
  const { userId } = useParams();
  const { data, loading, error }: any = useFetch(
    `${import.meta.env.VITE_API_DOMAIN}/users/${userId}`
  );

  const [localPosts, setLocalPosts] = useState(data?.posts);

  useEffect(() => {
    setLocalPosts(data?.posts);
  }, [data]);

  const handleDeletePost = (postId: string) => {
    setLocalPosts((prevPosts: any) => {
      return prevPosts.filter((prevPost: any) => prevPost._id !== postId);
    });
  };

  const handleEditPost = (postId: string, post: any) => {
    setLocalPosts((prevPosts: any) => {
      return prevPosts.map((prevPost: any) => {
        if (prevPost._id === postId) {
          return post;
        }
        return prevPost;
      });
    });
  };

  if (error) {
    <ErrorMessage message={error.message} />;
  }

  const user = data;

  return (
    user && (
      <div styleName="profile">
        <header styleName="profile__header">
          <Banner src={user.cover.imageUrl} altText={user.cover.altText} />
          <div styleName="profile__details">
            <Avatar
              src={user.photo.imageUrl}
              alt={user.photo.altText}
              size={"rounded"}
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
                <div styleName="profile__container">
                  <h3 styleName="profile__subtitle">Media</h3>
                  <button styleName="profile__button profile__button--friends">
                    See all media
                  </button>
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
            <Card>
              <div styleName="profile__card">
                <div styleName="profile__container">
                  <div styleName="profile__text">
                    <h3 styleName="profile__subtitle">Friends</h3>
                    <p styleName="profile__caption">
                      {user.friendCount} friends
                    </p>
                  </div>
                  <Link
                    styleName="profile__link profile__link--friends"
                    to="/friends/all"
                  >
                    See all friends
                  </Link>
                </div>
                <ul styleName="profile__friends">
                  {user.friends.map((friend: any) => {
                    return (
                      <li styleName="profile__friend">
                        <Link
                          styleName="profile__link profile__link--avatar"
                          to={`/users/${friend._id}`}
                        >
                          <Avatar
                            src={friend.photo.imageUrl}
                            alt={friend.photo.altText}
                            size={"lg"}
                          />
                        </Link>
                        <Link
                          styleName="profile__link profile__link--name"
                          to={`/users/${friend._id}`}
                        >
                          {friend.fullName}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Card>
            <SideFooter />
          </aside>
          <div styleName="profile__main">
            <Card>
              <h3 styleName="profile__title">Posts</h3>
            </Card>
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
              {localPosts && (
                <div>
                  {localPosts?.map((post: PostInterface) => {
                    return (
                      <Post
                        post={post}
                        key={post._id}
                        handleDeletePost={handleDeletePost}
                        handleEditPost={handleEditPost}
                      />
                    );
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
