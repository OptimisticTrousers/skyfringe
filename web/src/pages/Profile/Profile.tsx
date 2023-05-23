import { FC, useContext, useEffect, useState } from "react";
import CSSModules from "react-css-modules";
import { CreatePost, Feed, Post } from "../../components/posts";
import {
  SkeletonBio,
  SkeletonPost,
  SkeletonProfileFriendCard,
  SkeletonUserMedia,
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
import {
  ProfileMain,
  ProfileMedia,
  ProfileNav,
} from "../../components/profile";
import useProfileTabs from "../../hooks/useProfileTabs";
import ProfileFriends from "../../components/profile/ProfileFriends/ProfileFriends";

interface Props {
  profileView: any;
}

const Profile: FC<Props> = ({ profileView }) => {
  const { user: currentUser } = useContext(AuthContext);
  const { userId } = useParams();
  const { setData, data, loading, error }: any = useFetch(
    `${import.meta.env.VITE_API_DOMAIN}/users/${userId}`
  );
  const { selected } = useProfileTabs();

  const setFeed = (cb: any) => {
    setData((prevData: any) => {
      const clonedData = structuredClone(prevData);
      clonedData.posts = cb(prevData.posts);
      return clonedData;
    });
  };

  const setLikedPosts = (cb: any) => {
    setData((prevData: any) => {
      const clonedData = structuredClone(prevData);
      clonedData.likedPosts = cb(prevData.likedPosts);
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

  console.log(data?.user?.friends);

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
      <ProfileNav />
      {selected === "posts" && (
        <ProfileMain
          title="Posts"
          user={data?.user}
          posts={data?.posts}
          setFeed={setFeed}
          error={error}
          loading={loading}
        />
      )}
      {selected === "likedPosts" && (
        <ProfileMain
          title="Liked Posts"
          user={data?.user}
          posts={data?.likedPosts}
          setFeed={setLikedPosts}
          error={error}
          loading={loading}
        />
      )}
      {selected === "friends" && (
        <ProfileFriends friends={data?.user?.friends} />
      )}
      {selected === "media" && <ProfileMedia user={data?.user} />}
    </div>
  );
};

export default CSSModules(Profile, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
