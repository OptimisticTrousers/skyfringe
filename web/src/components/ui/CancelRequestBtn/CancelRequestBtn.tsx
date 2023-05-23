import { FC, useContext } from "react";
import useFriendRequests from "../../../hooks/useFriendRequests";
import CSSModules from "react-css-modules";
import styles from "./CancelRequestBtn.module.css";
import { AuthContext } from "../../../context/AuthContext";

interface Props {
  userId: string;
}

// Used to cancel a friend request you have sent
const CancelRequestBtn: FC<Props> = ({ userId }) => {
  const { request, data, loading, error } = useFriendRequests(userId);
  const { user, dispatch } = useContext(AuthContext);

  // Dynamically set button text to indicate loading state
  const setBtnText = () => {
    // Set out the conditionals in order of which they should be evaluated
    if (loading) {
      return "Cancelling...";
    }

    if (error) {
      return "Cancel";
    }

    if (data) {
      return "Cancelled!";
    }

    // Default state should be returned
    return "Cancel";
  };

  const handleCancel = async () => {
    const otherUser = await request(
      "cancelRequest",
      "Request cancelled.",
      "An unknown error has occured while cancelling the outgoing friend request."
    );
    const newUser = structuredClone(user);
    newUser.friendRequests = newUser.friendRequests.filter(
      (friendRequest: any) => friendRequest.user._id !== otherUser._id
    );
    dispatch({ type: "LOGIN", payload: newUser });
  };

  return (
    <button
      styleName="button"
      onClick={handleCancel}
      disabled={data ? true : false}
    >
      {setBtnText()}
    </button>
  );
};

export default CSSModules(CancelRequestBtn, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
