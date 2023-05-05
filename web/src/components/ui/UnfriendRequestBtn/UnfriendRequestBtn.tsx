import { FC } from "react";
import useFriendRequests from "../../../hooks/useFriendRequests";
import FriendRequestBtn from "../FriendRequestBtn";

interface Props {
  userId: string;
}

// Used to unfriend a user
const UnfriendRequestBtn: FC<Props> = ({ userId }) => {
  const { request, data, loading, error }: any = useFriendRequests(userId);

  // Dynamically change the button text to communicate loading taking place
  const setBtnText = () => {
    // Set out the conditionals in order of which they should be evaluated
    if (loading) {
      return "Removing...";
    }

    if (error) {
      return "Unfriend";
    }

    if (data) {
      return "Removed!";
    }

    // Default state should be returned
    return "Unfriend";
  };

  const handleUnfriend = () => {
    request(
      "unfriendRequest",
      "Friend removed.",
      "An unknown error has occured while unfriending."
    );
  };

  return (
    <FriendRequestBtn
      type="blue"
      handleClick={handleUnfriend}
      disabled={data ? true : false}
      text={setBtnText()}
    />
  );
};

export default UnfriendRequestBtn;
