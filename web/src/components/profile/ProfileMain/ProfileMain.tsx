import { FC, useContext } from "react";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import useFetch from "../../../hooks/useFetch";
import { SideFooter } from "../../home";
import { CreatePost, Feed } from "../../posts";
import { SkeletonBio, SkeletonProfileFriendCard } from "../../skeletons";
import { Card, Avatar, FinishedPosts } from "../../ui";
import styles from "./ProfileMain.module.css";

interface Props {
  posts: any;
  setFeed: any;
  loading: any;
  error: any;
  user: any;
  title: any;
}

const ProfileMain: FC<Props> = ({
  posts,
  setFeed,
  loading,
  error,
  user,
  title,
}) => {
  const {
    setData: setImages,
    data: images,
    loading: imageLoading,
    error: imageError,
  }: any = useFetch(
    `${import.meta.env.VITE_API_DOMAIN}/users/${user?._id}/images`
  );
  const { user: currentUser } = useContext(AuthContext);
  return (
    <div styleName="profile__content">
      <aside styleName="profile__aside">
        <Card>
          <div styleName="profile__card">
            <h3 styleName="profile__subtitle">About</h3>
            {imageLoading ? (
              <p styleName="profile__description">
                {user?.bio ? user?.bio : "Add a bio..."}
              </p>
            ) : (
              <SkeletonBio />
            )}
          </div>
        </Card>
        <Card>
          {imageLoading ? (
            <SkeletonProfileFriendCard />
          ) : (
            <>
              <div styleName="profile__card">
                <div styleName="profile__container">
                  <h3 styleName="profile__subtitle">Media</h3>
                  <Link
                    to={`media`}
                    styleName="profile__button profile__button--friends"
                  >
                    See all media
                  </Link>
                </div>
                <div styleName="profile__friends">
                  {images?.map((image: any) => {
                    return (
                      <Avatar
                        key={image.imageUrl}
                        src={image.imageUrl}
                        alt={image.altText}
                        size={"xl"}
                      />
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </Card>
        <Card>
          {user ? (
            <div styleName="profile__card">
              <div styleName="profile__container">
                <div styleName="profile__text">
                  <h3 styleName="profile__subtitle">Friends</h3>
                  <p styleName="profile__caption">
                    {user?.friendCount} friends
                  </p>
                </div>
                <Link
                  styleName="profile__link profile__link--friends"
                  to={`friends`}
                >
                  See all friends
                </Link>
              </div>
              {user?.friends.length !== 0 ? (
                <ul styleName="profile__friends">
                  {user?.friends?.map((friend: any) => {
                    return (
                      <li styleName="profile__friend" key={friend._id}>
                        <Link
                          styleName="profile__link profile__link--avatar"
                          to={`/users/${friend?._id}`}
                        >
                          <Avatar
                            src={friend?.photo && friend?.photo?.imageUrl}
                            alt={friend?.photo && friend?.photo?.altText}
                            size={"lg"}
                          />
                        </Link>
                        <Link
                          styleName="profile__link profile__link--name"
                          to={`/users/${friend?._id}`}
                        >
                          {friend?.fullName}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p styleName="profile__message">No friends yet...</p>
              )}
            </div>
          ) : (
            <SkeletonProfileFriendCard />
          )}
        </Card>
        <SideFooter />
      </aside>
      <div styleName="profile__main">
        <Card>
          <h3 styleName="profile__title">{title}</h3>
        </Card>
        {currentUser?._id === user?._id && <CreatePost setFeed={setFeed} />}
        <Feed posts={posts} loading={loading} error={error} setFeed={setFeed} />
        <FinishedPosts />
      </div>
    </div>
  );
};

export default CSSModules(ProfileMain, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
