import { User as IUser, FriendRequest as IFriendRequest } from "../../types";
import {
  bob,
  crocodile,
  locosPollos,
  luffy,
  nami,
  zoro,
} from "../config/populateDB";
import {
  checkExistingEntries,
  modifyForAcceptRequest,
  modifyForCancelRequest,
  modifyForDeleteRequest,
  modifyForSendRequest,
  modifyForUnfriendRequest,
} from "../controllers/friendController";
import mongoose, { Types } from "mongoose";

const sender: any = bob;
const recipient: any = locosPollos;

describe("PUT /api/friends/:userId", () => {
  // Push purposely clashing entires into friends array before running tests
  describe("checkExistingEntries function can identify existing entries of all sorts in the user's friends and friendRequests array", () => {
    // Reset arrays prior to each test
    beforeEach(() => {
      sender.friends = [luffy];
      sender.friendRequests = [
        {
          user: zoro,
          status: "outgoing",
        },
        {
          user: nami,
          status: "incoming",
        },
        {
          user: crocodile,
          status: "rejectedIncoming",
        },
      ];
    });
    test("Return null when no clashing entires exist", () => {
      expect(
        checkExistingEntries(
          recipient._id,
          sender.friends,
          sender.friendRequests
        )
      ).toBe(null);
    });
    test("Return 'incoming' when the recipient has already sent the sender a request", () => {
      sender.friendRequests.push({ user: recipient, status: "incoming" });
      expect(
        checkExistingEntries(
          recipient._id,
          sender.friends,
          sender.friendRequests
        )
      ).toBe("incoming");
    });
    test("Return 'outgoing' when the sender has already sent the recipient a request", () => {
      sender.friendRequests.push({
        user: recipient._id,
        status: "outgoing",
      });
      expect(
        checkExistingEntries(
          recipient._id,
          sender.friends,
          sender.friendRequests
        )
      ).toBe("outgoing");
    });
    test("Return 'outgoingRejected' when the sender's request was rejected", () => {
      sender.friendRequests.push({
        user: recipient._id,
        status: "outgoingRejected",
      });
      expect(
        checkExistingEntries(
          recipient._id,
          sender.friends,
          sender.friendRequests
        )
      ).toBe("outgoingRejected");
    });
    test("Return 'rejectedIncoming' when the recipient has rejected a request from the sender", () => {
      sender.friendRequests.push({
        user: recipient._id,
        status: "rejectedIncoming",
      });
      expect(
        checkExistingEntries(
          recipient._id,
          sender.friends,
          sender.friendRequests
        )
      ).toBe("rejectedIncoming");
    });
    test("Return 'friend' when the recipient and sender are already friends", () => {
      sender.friends.push(recipient._id);
      expect(
        checkExistingEntries(
          recipient._id,
          sender.friends,
          sender.friendRequests
        )
      ).toBe("friend");
    });
  });
  // Push purposely clashing entires into friends array before running tests
  describe("Modification functions make the correct adjustments to sender and recipient friend arrays", () => {
    // Reset arrays prior to each test
    beforeEach(() => {
      sender.friends = [];
      sender.friendRequests = [];
      recipient.friends = [];
      recipient.friendRequests = [];
    });
    test("Accepting a request modifies sender array accordingly", () => {
      sender.friendRequests = [{ user: recipient, status: "outgoing" }];
      recipient.friendRequests = [{ user: sender, status: "incoming" }];
      modifyForAcceptRequest(sender, recipient);
      expect(sender.friends[0]._id).toBe(recipient._id);
      expect(recipient.friends[0]._id).toBe(sender._id);
      expect(sender.friendRequests.length).toBe(0);
      expect(recipient.friendRequests.length).toBe(0);
    });
    test("Deleting a request modifies sender array accordingly", () => {
      sender.friendRequests = [{ user: recipient, status: "outgoing" }];
      recipient.friendRequests = [{ user: sender, status: "incoming" }];
      modifyForDeleteRequest(sender, recipient);
      expect(sender.friendRequests[0].user._id).toBe(recipient._id);
      expect(recipient.friendRequests[0].user._id).toBe(sender._id);
      expect(sender.friendRequests[0].status).toBe("outgoingRejected");
      expect(recipient.friendRequests[0].status).toBe("rejectedIncoming");
      expect(sender.friends.length).toBe(0);
      expect(recipient.friends.length).toBe(0);
    });
    test("Cancelling a request modifies sender array accordingly", () => {
      sender.friendRequests = [{ user: recipient, status: "outgoing" }];
      recipient.friendRequests = [{ user: sender, status: "incoming" }];
      modifyForCancelRequest(sender, recipient);
      expect(sender.friends.length).toBe(0);
      expect(recipient.friends.length).toBe(0);
      expect(sender.friendRequests.length).toBe(0);
      expect(recipient.friendRequests.length).toBe(0);
    });
    test("Sending a request modifies sender array accordingly", () => {
      modifyForSendRequest(sender, recipient);
      expect(sender.friendRequests[0].status).toBe("outgoing");
      expect(recipient.friendRequests[0].status).toBe("incoming");
    });
    test("Sending a request replaces a previous rejectedIncoming in recipient array with a new incoming request", () => {
      recipient.friendRequests = [{ user: sender, status: "rejectedIncoming" }];
      // Recipient now sending request after rejected incoming request
      modifyForSendRequest(sender, recipient);
      expect(recipient.friendRequests[0].status).toBe("incoming");
    });
    test("Sending a request replaces a previous outgoingRejected in recipient array with a new incoming request", () => {
      sender.friendRequests = [{ user: recipient, status: "outgoingRejected" }];
      modifyForSendRequest(sender, recipient);
      expect(sender.friendRequests[0].status).toBe("outgoing");
    });
    test("Unfriending someone removes friend entries from both sender and recipient friends array", () => {
      recipient.friends = [sender];
      sender.friends = [recipient];
      modifyForUnfriendRequest(sender, recipient);
      expect(recipient.friends.length).toBe(0);
      expect(sender.friends.length).toBe(0);
    });
  });
});
