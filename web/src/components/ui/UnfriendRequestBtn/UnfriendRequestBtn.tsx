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

  const handleUnfriend = async () => {
    const otherUser = await request(
      "unfriendRequest",
      "Friend removed.",
      "An unknown error has occured while unfriending."
    );
    const newUser = structuredClone(user);
    newUser.friends = newUser.friends.filter((friend: any) => friend._id !== otherUser._id);
    dispatch({ type: "LOGIN", payload: newUser });
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
