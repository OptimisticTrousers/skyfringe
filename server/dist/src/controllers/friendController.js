"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.friend_request = exports.modifyForUnfriendRequest = exports.modifyForDeleteRequest = exports.modifyForCancelRequest = exports.modifyForAcceptRequest = exports.modifyForSendRequest = exports.checkExistingEntries = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_1 = __importDefault(require("../models/user"));
const cleanStringify_1 = __importDefault(require("../utils/cleanStringify"));
const chatController_1 = require("./chatController");
const notifications_1 = require("../middleware/notifications");
// Use this function to ensure that no duplicate requests are sent, and that certain request types exist before performing related actions
const checkExistingEntries = (userId, senderFriends, senderFriendRequests) => {
    // Identify existing request for the user in the friendsArray provided. There should never be more than one existing entry. NOTE: .equals() must be used to compare ObjectID types here.
    const existingFriends = senderFriends.filter((request) => request._id.equals(userId));
    const existingRequests = senderFriendRequests.filter((request) => request.user._id.equals(userId));
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
exports.checkExistingEntries = checkExistingEntries;
// Adjust sender and recipient friend arrays when a request is to be sent
const modifyForSendRequest = (sender, recipient) => {
    const existingRequestIndex = sender.friendRequests.findIndex((request) => request.user._id.equals(recipient._id));
    if (existingRequestIndex === -1) {
        sender.friendRequests.push({
            // add outgoing request to sender doc
            user: recipient,
            status: "outgoing",
        });
    }
    else {
        sender.friendRequests[existingRequestIndex].status = "outgoing";
    }
    // Check for existing delete request in recipient's array (i.e. the sender has previously deleted/denied a request from this user)
    const deletedRequestIndex = recipient.friendRequests.findIndex((request) => request.user._id.equals(sender._id));
    if (deletedRequestIndex === -1) {
        // no rejectedIncoming exists, send normal request
        recipient.friendRequests.push({
            // add incoming request to recipient doc
            user: sender,
            status: "incoming",
        });
    }
    else {
        // rejectedIncoming exists. Modify this to incoming request to avoid request duplicates
        recipient.friendRequests[deletedRequestIndex].status = "incoming";
    }
};
exports.modifyForSendRequest = modifyForSendRequest;
// Adjust sender and recipient friend arrays when a request is to be accepted
const modifyForAcceptRequest = (sender, recipient) => {
    // Find the friend requests amongst the array of friends
    const outgoingRequestIndex = sender.friendRequests.findIndex((request) => request.user._id.equals(recipient._id));
    const incomingRequestIndex = recipient.friendRequests.findIndex((request) => request.user._id.equals(sender._id));
    // Modify the status values
    sender.friends.push(recipient);
    recipient.friends.push(sender);
    sender.friendRequests.splice(outgoingRequestIndex, 1);
    recipient.friendRequests.splice(incomingRequestIndex, 1);
};
exports.modifyForAcceptRequest = modifyForAcceptRequest;
// Adjust sender and recipient friend arrays when a request is to be cancelled
const modifyForCancelRequest = (sender, recipient) => {
    // Find the friend requests amongst the array of friends
    const outgoingRequestIndex = sender.friendRequests.findIndex((request) => request.user._id.equals(recipient._id));
    const incomingRequestIndex = recipient.friendRequests.findIndex((request) => request.user._id.equals(sender._id));
    // Modify the status values
    sender.friendRequests.splice(outgoingRequestIndex, 1);
    recipient.friendRequests.splice(incomingRequestIndex, 1);
};
exports.modifyForCancelRequest = modifyForCancelRequest;
// Adjust sender and recipient friend arrays when a request is to be deleted
const modifyForDeleteRequest = (sender, recipient) => {
    // Find the friend requests amongst the array of friends
    const incomingRequestIndex = sender.friendRequests.findIndex((request) => request.user._id.equals(recipient._id));
    const outgoingRequestIndex = recipient.friendRequests.findIndex((request) => request.user._id.equals(sender._id));
    // Modify the status values
    sender.friendRequests[incomingRequestIndex].status = "outgoingRejected";
    recipient.friendRequests[outgoingRequestIndex].status = "rejectedIncoming";
};
exports.modifyForDeleteRequest = modifyForDeleteRequest;
// Adjust sender and recipient friend arrays when a request is made to unfriend someone
const modifyForUnfriendRequest = (sender, recipient) => {
    // Find the friend requests amongst the array of friends
    const incomingRequestIndex = recipient.friends.findIndex((request) => request._id.equals(sender._id));
    const outgoingRequestIndex = sender.friends.findIndex((request) => request._id.equals(recipient._id));
    // Remove the array entries on both ends
    sender.friends.splice(outgoingRequestIndex, 1);
    recipient.friends.splice(incomingRequestIndex, 1);
};
exports.modifyForUnfriendRequest = modifyForUnfriendRequest;
// @desc    Handle all friend requests. API call MUST specify requestType in the request body
// @route   PUT /api/friends/:userId
// @access  Private
exports.friend_request = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Req.user will contain the sender's details
    // When clicking on another user's details, their ID should be captured and passed into the req.params.userId for example
    // In all friend request functions, the requestSender describes the currently logged in user that is making a request of some kind, be it sending, accepting, cancelling, or deleting. The recepient describes the user that is the target of the sender's request, again regardless of if the sender if sending a request to that user, or accepting a request from that user
    const user = req.user;
    const sender = (yield user_1.default.findById(user._id)
        .populate("friends")
        .populate("friendRequests")
        .exec());
    const recipient = (yield user_1.default.findById(req.params.userId)
        .populate("friends")
        .populate("friendRequests")
        .exec());
    if (!recipient) {
        // user not found in db
        res.status(404).json({ message: "User not found" });
        return;
    }
    // Check for existing requests
    // Check for existing requests
    const existingRequest = (0, exports.checkExistingEntries)(recipient._id, sender.friends, sender.friendRequests);
    const errorMessage = "Reject no longer exists";
    // Incoming req.body will contain the type of operation required. Perform logic as needed
    switch (req.body.requestType) {
        case "sendRequest": // user is sending a request request to another user
            if (!existingRequest ||
                existingRequest === "rejectedIncoming" ||
                existingRequest === "outgoingRejected") {
                // Request able to be sent. Adjust recipient and sender's friends as needed
                (0, exports.modifyForSendRequest)(sender, recipient);
                break;
            }
            else {
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
                        throw new Error("Outgoing request from this user was already rejected");
                    case "rejectedIncoming":
                        throw new Error("Incoming request to this user was already rejected");
                    default:
                        throw new Error("Request unable to be completed");
                }
            }
        case "acceptRequest": // user is accepting a friend request from another user
            if (existingRequest === "incoming") {
                // Request able to be Accepted. Adjust recipient and sender's friends as needed
                (0, exports.modifyForAcceptRequest)(sender, recipient);
                // Create a new chat when two users are friends
                req.body.friend = recipient;
                (0, chatController_1.create_chat)(req, res, next);
                break;
            }
            else {
                // Request cannot be accepted (none available)
                res.status(400);
                throw new Error(errorMessage);
            }
        case "rejectRequest": // user is rejecting a friend request from another user
            if (existingRequest === "incoming") {
                // Request able to be rejected. Adjust recipient and sender's friends as needed
                (0, exports.modifyForDeleteRequest)(sender, recipient);
                break;
            }
            else {
                // Request cannot be accepted (none available)
                res.status(400);
                throw new Error(errorMessage);
            }
        case "cancelRequest": //user is cancelling a friend request to another usr
            if (existingRequest === "outgoing") {
                // Request able to be deleted. Adjust recipient and sender's friends as needed
                (0, exports.modifyForCancelRequest)(sender, recipient);
                (0, notifications_1.cancel_send_notification)(req, res, next);
                break;
            }
            else {
                // Request cannot be accepted (none available)
                res.status(400);
                throw new Error(errorMessage);
            }
        case "unfriendRequest": // user is unfriending an existing friend
            if (existingRequest === "friend") {
                // Request able to be deleted. Adjust recipient and sender's friends as needed
                (0, exports.modifyForUnfriendRequest)(sender, recipient);
                (0, notifications_1.send_unfriend_notification)(req, res, next);
                break;
            }
            else {
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
    yield recipient.save();
    yield sender.save();
    // Create a new object without circular references
    const recipientData = recipient.toJSON();
    recipientData.friends = JSON.parse((0, cleanStringify_1.default)(recipientData.friends));
    recipientData.friendRequests = JSON.parse((0, cleanStringify_1.default)(recipientData.friendRequests));
    // Return information of recipient (to populate a 'request sent to: ' message in frontend)
    res.status(200).json(recipientData);
}));
