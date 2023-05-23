import { FC, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useFriendRequests from "../../../hooks/useFriendRequests";
import FriendRequestBtn from "../FriendRequestBtn";

interface Props {
  userId: string;
}

// Used to unfriend a user
const UnfriendRequestBtn: FC<Props> = ({ userId }) => {
  const { request, data, loading, error } = useFriendRequests(userId);
  const { user, dispatch } = useContext(AuthContext);

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

  const handleAccept = async () => {
    const otherUser = await request(
      "acceptRequest",
      "Request accept.",
      "An unknown error has occured while accepting the friend request."
    );
    const newUser = structuredClone(user);
    newUser.friendRequests = newUser.friendRequests.filter(
      (friendRequest: any) => friendRequest.user._id !== otherUser._id
    );
    newUser.friends.push(otherUser);
    dispatch({ type: "LOGIN", payload: newUser });
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
