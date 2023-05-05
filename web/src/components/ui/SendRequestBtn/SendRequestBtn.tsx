import { FC } from "react";
import useFriendRequests from "../../../hooks/useFriendRequests";
import FriendRequestBtn from "../FriendRequestBtn";

interface Props {
  userId: string;
}

// Used to send a friend request to a user
const SendRequestBtn: FC<Props> = ({ userId }) => {
  const { request, data, loading, error }: any = useFriendRequests(userId);

  // Dynamically change btn text to indicate loading of request
  const setBtnText = () => {
    // Set out the conditionals in order of which they should be evaluated
    if (loading) {
      return "Sending...";
    }

    if (error) {
      return "Add Friend";
    }

    if (data) {
      return "Sent!";
    }

    // Default state should be returned
    return "Add Friend";
  };

  const handleAccept = () => {
    request(
      "sendRequest",
      "Request sent.",
      "An unknown error has occured while sending the friend request."
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

export default SendRequestBtn;
