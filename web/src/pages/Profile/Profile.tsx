import { useContext, useEffect, useState } from "react";
import CSSModules from "react-css-modules";
import { CreatePost, Feed, Post } from "../../components/posts";
import {
  SkeletonBio,
  SkeletonPost,
  SkeletonProfileFriendCard,
} from "../../components/skeletons";
import {
  AcceptRequestBtn,
  Avatar,
  Banner,
  Card,
  CancelRequestBtn,
  DeleteRequestBtn,
  ErrorMessage,
  FinishedPosts,
  SendRequestBtn,
  UnfriendRequestBtn,
} from "../../components/ui";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import {
  FriendRequestWithStringId as FriendRequest,
  PostWithStringId as IPost,
  UserWithStringId as User,
} from "@backend/types";
import styles from "./Profile.module.css";
import { Link, useParams } from "react-router-dom";
import { SideFooter } from "../../components/home";

const Profile = () => {
  const { user: currentUser } = useContext(AuthContext);
  const { userId } = useParams();
  const { setData, data, loading, error }: any = useFetch(
    `${import.meta.env.VITE_API_DOMAIN}/users/${userId}`
  );

  const setFeed = (cb: any) => {
    setData((prevData: any) => {
      const clonedData = structuredClone(prevData);
      clonedData.posts = cb(prevData.posts);
      return clonedData;
    });
  };

  const user = data?.user;

  const incomingRequests = user?.friendRequests.filter(
    (friendRequest: FriendRequest) =>
      friendRequest.status === "incoming" &&
      data?.user._id === friendRequest.user._id
  );
  const sentRequests = user?.friendRequests.filter(
    (friendRequest: FriendRequest) =>
      friendRequest.status === "outgoing" &&
      data?.user._id === friendRequest.user._id
  );
  const rejectedIncoming = user?.friendRequests.filter(
    (friendRequest: FriendRequest) =>
      friendRequest.status === "rejectedIncoming" &&
      data?.user._id === friendRequest.user._id
  );
  const outgoingRejected = user?.friendRequests.filter(
    (friendRequest: FriendRequest) =>
      friendRequest.status === "outgoingRejected" &&
      data?.user._id === friendRequest.user._id
  );

  const friends = currentUser.friends.filter((user: User) => {
    if (data?.user._id === user._id) {
      return user;
    }
  });

  return (
    <div styleName="profile">
      <header styleName="profile__header">
        <Banner
          src={user?.cover && user?.cover?.imageUrl}
          altText={user?.cover && user?.cover?.altText}
        />
        <div styleName="profile__details">
          <Avatar
            src={user?.photo && user?.photo?.imageUrl}
            alt={user?.photo && user?.photo?.altText}
            size={"rounded"}
          />
          <div styleName="profile__text">
            <h2 styleName="profile__name">{user?.fullName}</h2>
            {user?.userName ? (
              <h3 styleName="profile__username">@{user?.userName}</h3>
            ) : null}
          </div>
        </div>
        {currentUser._id !== data?.user?._id ? (
          <div styleName="profile__request">
            {outgoingRejected?.length !== 0 && (
              <SendRequestBtn userId={data?.user?._id} />
            )}
            {rejectedIncoming?.length !== 0 && (
              <SendRequestBtn userId={data?.user?._id} />
            )}
            {sentRequests?.length !== 0 && (
              <CancelRequestBtn userId={data?.user?._id} />
            )}
            {friends?.length !== 0 && (
              <UnfriendRequestBtn userId={data?.user?._id} />
            )}
            {incomingRequests?.length !== 0 && (
              <div>
                <AcceptRequestBtn userId={data?.user?._id} />
                <DeleteRequestBtn userId={data?.user?._id} />
              </div>
            )}
          </div>
        ) : null}
      </header>
      <div styleName="profile__content">
        <aside styleName="profile__aside">
          <Card>
            <div styleName="profile__card">
              <h3 styleName="profile__subtitle">About</h3>
              {user?.bio ? (
                <p styleName="profile__description">
                  {user?.bio ? user?.bio : "Add a bio..."}
                </p>
              ) : (
                <SkeletonBio />
              )}
            </div>
          </Card>
          <Card>
            <SkeletonProfileFriendCard />
            {/* <div styleName="profile__card">
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
            </div> */}
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
                    to="/friends/all"
                  >
                    See all friends
                  </Link>
                </div>
                  {user?.friends.length !== 0 ? user?.friends?.map((friend: any) => {
                    return (
                <ul styleName="profile__friends">
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
                </ul>
                    );
                  }) : (
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
            <h3 styleName="profile__title">Posts</h3>
          </Card>
          {currentUser?._id === data?.user?._id && (
            <CreatePost setFeed={setFeed} />
          )}
          <Feed
            posts={data?.posts}
            loading={loading}
            error={error}
            setFeed={setFeed}
          />
          <FinishedPosts />
        </div>
      </div>
    </div>
  );
};

export default CSSModules(Profile, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
