"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const populateDB_1 = require("../config/populateDB");
const friendController_1 = require("../controllers/friendController");
const sender = populateDB_1.bob;
const recipient = populateDB_1.locosPollos;
describe("PUT /api/friends/:userId", () => {
    // Push purposely clashing entires into friends array before running tests
    describe("checkExistingEntries function can identify existing entries of all sorts in the user's friends and friendRequests array", () => {
        // Reset arrays prior to each test
        beforeEach(() => {
            sender.friends = [populateDB_1.luffy];
            sender.friendRequests = [
                {
                    user: populateDB_1.zoro,
                    status: "outgoing",
                },
                {
                    user: populateDB_1.nami,
                    status: "incoming",
                },
                {
                    user: populateDB_1.crocodile,
                    status: "rejectedIncoming",
                },
            ];
        });
        test("Return null when no clashing entires exist", () => {
            expect((0, friendController_1.checkExistingEntries)(recipient._id, sender.friends, sender.friendRequests)).toBe(null);
        });
        test("Return 'incoming' when the recipient has already sent the sender a request", () => {
            sender.friendRequests.push({ user: recipient, status: "incoming" });
            expect((0, friendController_1.checkExistingEntries)(recipient._id, sender.friends, sender.friendRequests)).toBe("incoming");
        });
        test("Return 'outgoing' when the sender has already sent the recipient a request", () => {
            sender.friendRequests.push({
                user: recipient._id,
                status: "outgoing",
            });
            expect((0, friendController_1.checkExistingEntries)(recipient._id, sender.friends, sender.friendRequests)).toBe("outgoing");
        });
        test("Return 'outgoingRejected' when the sender's request was rejected", () => {
            sender.friendRequests.push({
                user: recipient._id,
                status: "outgoingRejected",
            });
            expect((0, friendController_1.checkExistingEntries)(recipient._id, sender.friends, sender.friendRequests)).toBe("outgoingRejected");
        });
        test("Return 'rejectedIncoming' when the recipient has rejected a request from the sender", () => {
            sender.friendRequests.push({
                user: recipient._id,
                status: "rejectedIncoming",
            });
            expect((0, friendController_1.checkExistingEntries)(recipient._id, sender.friends, sender.friendRequests)).toBe("rejectedIncoming");
        });
        test("Return 'friend' when the recipient and sender are already friends", () => {
            sender.friends.push(recipient._id);
            expect((0, friendController_1.checkExistingEntries)(recipient._id, sender.friends, sender.friendRequests)).toBe("friend");
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
            (0, friendController_1.modifyForAcceptRequest)(sender, recipient);
            expect(sender.friends[0]._id).toBe(recipient._id);
            expect(recipient.friends[0]._id).toBe(sender._id);
            expect(sender.friendRequests.length).toBe(0);
            expect(recipient.friendRequests.length).toBe(0);
        });
        test("Deleting a request modifies sender array accordingly", () => {
            sender.friendRequests = [{ user: recipient, status: "outgoing" }];
            recipient.friendRequests = [{ user: sender, status: "incoming" }];
            (0, friendController_1.modifyForDeleteRequest)(sender, recipient);
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
            (0, friendController_1.modifyForCancelRequest)(sender, recipient);
            expect(sender.friends.length).toBe(0);
            expect(recipient.friends.length).toBe(0);
            expect(sender.friendRequests.length).toBe(0);
            expect(recipient.friendRequests.length).toBe(0);
        });
        test("Sending a request modifies sender array accordingly", () => {
            (0, friendController_1.modifyForSendRequest)(sender, recipient);
            expect(sender.friendRequests[0].status).toBe("outgoing");
            expect(recipient.friendRequests[0].status).toBe("incoming");
        });
        test("Sending a request replaces a previous rejectedIncoming in recipient array with a new incoming request", () => {
            recipient.friendRequests = [{ user: sender, status: "rejectedIncoming" }];
            // Recipient now sending request after rejected incoming request
            (0, friendController_1.modifyForSendRequest)(sender, recipient);
            expect(recipient.friendRequests[0].status).toBe("incoming");
        });
        test("Sending a request replaces a previous outgoingRejected in recipient array with a new incoming request", () => {
            sender.friendRequests = [{ user: recipient, status: "outgoingRejected" }];
            (0, friendController_1.modifyForSendRequest)(sender, recipient);
            expect(sender.friendRequests[0].status).toBe("outgoing");
        });
        test("Unfriending someone removes friend entries from both sender and recipient friends array", () => {
            recipient.friends = [sender];
            sender.friends = [recipient];
            (0, friendController_1.modifyForUnfriendRequest)(sender, recipient);
            expect(recipient.friends.length).toBe(0);
            expect(sender.friends.length).toBe(0);
        });
    });
});
