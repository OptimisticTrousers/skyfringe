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

  function getRelation() {
    // Check if the users have no relation with each other
    if (!user) return;

    if (
      !currentUser?.friendRequests.some(
        (request: any) => request.user._id === user?._id
      ) &&
      !currentUser?.friends.some((friend: any) => friend._id === user?._id)
    ) {
      return "user";
    }

    // Check if there is an "outgoing" request from 'currentUser'
    const outgoingRequest = currentUser?.friendRequests.find(
      (request: any) =>
        request.user._id === user?._id && request.status === "outgoing"
    );
    if (outgoingRequest) {
      return "outgoing";
    }

    // Check if there is an "incoming" request received by 'currentUser'
    const incomingRequest = currentUser?.friendRequests.find(
      (request: any) =>
        request.user._id === user?._id && request.status === "incoming"
    );
    if (incomingRequest) {
      return "incoming";
    }

    // Check if the 'currentUser' is friends with the "user"
    if (currentUser?.friends.some((friend: any) => friend._id === user?._id)) {
      return "friend";
    }

    // Check if there is a "rejectedIncoming" request from 'currentUser'
    const rejectedIncomingRequest = currentUser?.friendRequests.find(
      (request: any) =>
        request.user._id === user?._id && request.status === "rejectedIncoming"
    );
    if (rejectedIncomingRequest) {
      return "user";
    }

    // Check if there is an "outgoingRejected" request from 'currentUser'
    const outgoingRejectedRequest = currentUser?.friendRequests.find(
      (request: any) =>
        request.user._id === user?._id && request.status === "outgoingRejected"
    );
    if (outgoingRejectedRequest) {
      return "user";
    }
  }

  const type = getRelation();

  return (
    <div styleName="profile">
      <header styleName="profile__header">
        <Banner
          src={user?.cover && user?.cover?.imageUrl}
          altText={user?.cover && user?.cover?.altText}
        />
          <div styleName="profile__details">
            <div styleName="profile__left">
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
                {type === "user" && <SendRequestBtn userId={data?.user?._id} />}
                {type === "friend" && (
                  <UnfriendRequestBtn userId={data?.user?._id} />
                )}
                {type === "outgoing" && (
                  <CancelRequestBtn userId={data?.user?._id} />
                )}
                {type === "incoming" && (
                  <div styleName="profile__requests">
                    <AcceptRequestBtn userId={data?.user?._id} />
                    <DeleteRequestBtn userId={data?.user?._id} />
                  </div>
                )}
              </div>
            ) : null}
          </div>
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
