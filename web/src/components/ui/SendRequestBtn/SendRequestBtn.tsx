import { FC, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useFriendRequests from "../../../hooks/useFriendRequests";
import FriendRequestBtn from "../FriendRequestBtn";

interface Props {
  userId: string;
}

// Used to send a friend request to a user
const SendRequestBtn: FC<Props> = ({ userId }) => {
  const { request, data, loading, error }: any = useFriendRequests(userId);
  const { user, dispatch } = useContext(AuthContext);

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

  const handleSend = async () => {
    const otherUser = await request(
      "sendRequest",
      "Request sent.",
      "An unknown error has occured while sending the friend request."
    );
    const newUser = structuredClone(user);
    newUser.friendRequests.push({ user: otherUser, status: "outgoing" });
    dispatch({ type: "LOGIN", payload: newUser });
  };

  return (
    <FriendRequestBtn
      type="blue"
      handleClick={handleSend}
      disabled={data ? true : false}
      text={setBtnText()}
    />
  );
};

export default SendRequestBtn;
