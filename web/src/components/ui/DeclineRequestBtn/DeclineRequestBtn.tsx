import { FC, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useFriendRequests from "../../../hooks/useFriendRequests";
import FriendRequestBtn from "../FriendRequestBtn";

interface Props {
  userId: string;
}

// Used to delete a friend request sent by another user
const DeclineRequestBtn: FC<Props> = ({ userId }) => {
  const { request, data, loading, error } = useFriendRequests(userId);
  const { user, dispatch } = useContext(AuthContext);

  // Dynamically set button text to indicate loading state
  const setBtnText = () => {
    // Set out the conditionals in order of which they should be evaluated
    if (loading) {
      return "Declining...";
    }

    if (error) {
      return "Decline";
    }

    if (data) {
      return "Declined!";
    }

    // Default state should be returned
    return "Decline";
  };

  const handleDecline = async () => {
    const otherUser = await request(
      "rejectRequest",
      "Request rejected.",
      "An unknown error has occured while rejecting the friend request."
    );
    const newUser = structuredClone(user);
    newUser.friendRequests = newUser.friendRequests.map((friendRequest: any) => {
      if (friendRequest.user._id === otherUser._id) {
        return { user: friendRequest.user, status: "rejectedIncoming" };
      }
      return friendRequest
    });
    dispatch({ type: "LOGIN", payload: newUser });
  };

  return (
    <FriendRequestBtn
      type="white"
      handleClick={handleDecline}
      disabled={data ? true : false}
      text={setBtnText()}
    />
  );
};

export default DeclineRequestBtn;
