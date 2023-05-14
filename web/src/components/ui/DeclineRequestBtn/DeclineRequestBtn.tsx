import { FC } from "react";
import useFriendRequests from "../../../hooks/useFriendRequests";
import FriendRequestBtn from "../FriendRequestBtn";

interface Props {
  userId: string;
}

// Used to delete a friend request sent by another user
const DeclineRequestBtn: FC<Props> = ({ userId }) => {
  const { request, data, loading, error } = useFriendRequests(userId);

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

  const handleDecline = () => {
    request(
      "rejectRequest",
      "Request rejected.",
      "An unknown error has occured while rejecting the friend request."
    );
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
