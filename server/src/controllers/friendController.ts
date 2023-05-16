import { Types } from "mongoose";
import asyncHandler from "express-async-handler";
import User from "../models/user";
import { User as IUser, FriendRequest as IFriendRequest } from "../../types";
import { Request, Response } from "express";

// Use this function to ensure that no duplicate requests are sent, and that certain request types exist before performing related actions
export const checkExistingEntries = (
  userId: Types.ObjectId,
  senderFriends: IUser[],
  senderFriendRequests: IFriendRequest[]
) => {
  // Identify existing request for the user in the friendsArray provided. There should never be more than one existing entry. NOTE: .equals() must be used to compare ObjectID types here.
  const existingFriends = senderFriends.filter((request: IUser) =>
    request._id.equals(userId)
  );

  const existingRequests = senderFriendRequests.filter(
    (request: IFriendRequest) => request.user._id.equals(userId)
  );

  if (existingFriends.length !== 0) {
    // User is already a friend. Return type of request.
    return "friend";
  }
  if (existingRequests.length !== 0) {
    // Existing request is present. Return type of request.
    return existingRequests[0].status;
  }
  // No request exists, exit function here
  return null;
};

// Adjust sender and recipient friend arrays when a request is to be sent
export const modifyForSendRequest = (sender: IUser, recipient: IUser) => {
  const existingRequestIndex = sender.friendRequests.findIndex((request) =>
    request.user._id.equals(recipient._id)
  );

  if (existingRequestIndex === -1) {
    sender.friendRequests.push({
      // add outgoing request to sender doc
      user: recipient,
      status: "outgoing",
    });
  } else {
    sender.friendRequests[existingRequestIndex].status = "outgoing";
  }

  // Check for existing delete request in recipient's array (i.e. the sender has previously deleted/denied a request from this user)
  const deletedRequestIndex = recipient.friendRequests.findIndex((request) =>
    request.user._id.equals(sender._id)
  );

  if (deletedRequestIndex === -1) {
    // no rejectedIncoming exists, send normal request
    recipient.friendRequests.push({
      // add incoming request to recipient doc
      user: sender,
      status: "incoming",
    });
  } else {
    // rejectedIncoming exists. Modify this to incoming request to avoid request duplicates
    recipient.friendRequests[deletedRequestIndex].status = "incoming";
  }
};

// Adjust sender and recipient friend arrays when a request is to be accepted
export const modifyForAcceptRequest = (sender: IUser, recipient: IUser) => {
  // Find the friend requests amongst the array of friends
  const outgoingRequestIndex = sender.friendRequests.findIndex(
    (request: IFriendRequest) => request.user._id.equals(recipient._id)
  );

  const incomingRequestIndex = recipient.friendRequests.findIndex(
    (request: IFriendRequest) => request.user._id.equals(sender._id)
  );

  // Modify the status values
  sender.friends.push(recipient);
  recipient.friends.push(sender);
  sender.friendRequests.splice(outgoingRequestIndex, 1);
  recipient.friendRequests.splice(incomingRequestIndex, 1);
};

// Adjust sender and recipient friend arrays when a request is to be cancelled
export const modifyForCancelRequest = (sender: IUser, recipient: IUser) => {
  // Find the friend requests amongst the array of friends
  const outgoingRequestIndex = sender.friendRequests.findIndex(
    (request: IFriendRequest) => request.user._id.equals(recipient._id)
  );
  const incomingRequestIndex = recipient.friendRequests.findIndex(
    (request: IFriendRequest) => request.user._id.equals(sender._id)
  );

  // Modify the status values
  sender.friendRequests.splice(outgoingRequestIndex, 1);
  recipient.friendRequests.splice(incomingRequestIndex, 1);
};

// Adjust sender and recipient friend arrays when a request is to be deleted
export const modifyForDeleteRequest = (sender: IUser, recipient: IUser) => {
  // Find the friend requests amongst the array of friends
  const incomingRequestIndex = sender.friendRequests.findIndex(
    (request: IFriendRequest) => request.user._id.equals(recipient._id)
  );
  const outgoingRequestIndex = recipient.friendRequests.findIndex(
    (request: IFriendRequest) => request.user._id.equals(sender._id)
  );

  // Modify the status values
  sender.friendRequests[incomingRequestIndex].status = "outgoingRejected";
  recipient.friendRequests[outgoingRequestIndex].status = "rejectedIncoming";
};

// Adjust sender and recipient friend arrays when a request is made to unfriend someone
export const modifyForUnfriendRequest = (sender: IUser, recipient: IUser) => {
  // Find the friend requests amongst the array of friends
  const incomingRequestIndex = recipient.friends.findIndex((request) =>
    request._id.equals(sender._id)
  );
  const outgoingRequestIndex = sender.friends.findIndex((request) =>
    request._id.equals(recipient._id)
  );

  // Remove the array entries on both ends
  sender.friends.splice(outgoingRequestIndex, 1);
  recipient.friends.splice(incomingRequestIndex, 1);
};

// @desc    Handle all friend requests. API call MUST specify requestType in the request body
// @route   PUT /api/friends/:userId
// @access  Private
export const friend_request = asyncHandler(
  async (req: Request, res: Response) => {
    // Req.user will contain the sender's details
    // When clicking on another user's details, their ID should be captured and passed into the req.params.userId for example
    // In all friend request functions, the requestSender describes the currently logged in user that is making a request of some kind, be it sending, accepting, cancelling, or deleting. The recepient describes the user that is the target of the sender's request, again regardless of if the sender if sending a request to that user, or accepting a request from that user
    const user = req.user as IUser;
    const sender = (await User.findById(user._id)
      .populate("friends")
      .populate("friendRequests")
      .exec()) as IUser;
    const recipient = (await User.findById(req.params.userId)
      .populate("friends")
      .populate("friendRequests")
      .exec()) as IUser;

    if (!recipient) {
      // user not found in db
      res.status(404).json({ message: "User not found" });
      return;
    }
    // Check for existing requests
    // Check for existing requests
    const existingRequest = checkExistingEntries(
      recipient._id,
      sender.friends,
      sender.friendRequests
    );
    const errorMessage = "Reject no longer exists";
    // Incoming req.body will contain the type of operation required. Perform logic as needed
    switch (req.body.requestType) {
      case "sendRequest": // user is sending a request request to another user
        if (
          !existingRequest ||
          existingRequest === "rejectedIncoming" ||
          existingRequest === "outgoingRejected"
        ) {
          // Request able to be sent. Adjust recipient and sender's friends as needed
          modifyForSendRequest(sender, recipient);
          break;
        } else {
          // Request cannot be sent. Customize error message depending on reason
          res.status(400);
          switch (existingRequest) {
            case "friend":
              throw new Error("User is already a friend");
            case "incoming":
              throw new Error("Incoming request exists from this user");
            case "outgoing":
              throw new Error("Outgoing request to this user already exists");
            case "outgoingRejected":
              throw new Error(
                "Outgoing request from this user was already rejected"
              );
            case "rejectedIncoming":
              throw new Error(
                "Incoming request to this user was already rejected"
              );
            default:
              throw new Error("Request unable to be completed");
          }
        }
      case "acceptRequest": // user is accepting a friend request from another user
        if (existingRequest === "incoming") {
          // Request able to be Accepted. Adjust recipient and sender's friends as needed
          modifyForAcceptRequest(sender, recipient);
          break;
        } else {
          // Request cannot be accepted (none available)
          res.status(400);
          throw new Error(errorMessage);
        }
      case "rejectRequest": // user is rejecting a friend request from another user
        if (existingRequest === "incoming") {
          // Request able to be rejected. Adjust recipient and sender's friends as needed
          modifyForDeleteRequest(sender, recipient);
          break;
        } else {
          // Request cannot be accepted (none available)
          res.status(400);
          throw new Error(errorMessage);
        }
      case "cancelRequest": //user is cancelling a friend request to another usr
        if (existingRequest === "outgoing") {
          // Request able to be deleted. Adjust recipient and sender's friends as needed
          modifyForCancelRequest(sender, recipient);
          break;
        } else {
          // Request cannot be accepted (none available)
          res.status(400);
          throw new Error(errorMessage);
        }
      case "unfriendRequest": // user is unfriending an existing friend
        if (existingRequest === "friend") {
          // Request able to be deleted. Adjust recipient and sender's friends as needed
          modifyForUnfriendRequest(sender, recipient);
          break;
        } else {
          // Request cannot be accepted (none available)
          res.status(400);
          throw new Error("Cannot unfriend a user you are not friends with");
        }
      default:
        // No request type or incorrect request type provided
        res.status(400);
        throw new Error("Request type missing or invalid");
    }
    // Save these changes to the db
    await recipient.save();
    await sender.save();

    // Return information of recipient (to populate a 'request sent to: ' message in frontend. Check that password is not being sent here though!)
    res.status(200).json(recipient);
  }
);
