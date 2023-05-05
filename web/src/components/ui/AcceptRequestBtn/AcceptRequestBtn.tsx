import { FC } from "react";
import useFriendRequests from "../../../hooks/useFriendRequests";
import FriendRequestBtn from "../FriendRequestBtn";

interface Props {
  userId: string;
}

// Used to unfriend a user
const UnfriendRequestBtn: FC<Props> = ({ userId }) => {
  const { request, data, loading, error }: any = useFriendRequests(userId);

  // Dynamically set button text to indicate loading state
  const setBtnText = () => {
    // Set out the conditionals in order of which they should be evaluated
    if (loading) {
      return "Accepting...";
    }

    if (error) {
      return "Accept";
    }

    if (data) {
      return "Accepted!";
    }

    // Default state should be returned
    return "Accept";
  };

  const handleAccept = () => {
    request(
      "acceptRequest",
      "Request accept.",
      "An unknown error has occured while accepting the friend request."
    );
  };

  return (
    <FriendRequestBtn
      type="blue"
      handleClick={handleAccept}
      disabled={data ? true : false}
      text={setBtnText()}
    />
  );
};

export default UnfriendRequestBtn;
