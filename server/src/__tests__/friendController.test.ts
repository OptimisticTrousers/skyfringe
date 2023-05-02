import {
  User as IUser,
  FriendRequest as IFriendRequest,
} from "../../../shared/types";
import {
  checkExistingEntries,
  modifyForAcceptRequest,
  modifyForCancelRequest,
  modifyForDeleteRequest,
  modifyForSendRequest,
  modifyForUnfriendRequest,
} from "../controllers/friendController";
import mongoose, { Types } from "mongoose";

type FriendRequests = { user: Types.ObjectId; status: string }[];

const sender = {
  _id: new mongoose.Types.ObjectId("569ed8269353e9f4c51617aa"),
  friends: [] as Types.ObjectId[],
  friendRequests: [] as FriendRequests,
};
const recipient = {
  _id: new mongoose.Types.ObjectId("569ed8269353e9f4c51617ab"),
  friends: [] as Types.ObjectId[],
  friendRequests: [] as FriendRequests,
};

// Push purposely clashing entires into friends array before running tests
describe("checkExistingEntries function can identify existing entries of all sorts in the user's friends and friendRequests array", () => {
  // Reset arrays prior to each test
  beforeEach(() => {
    sender.friends = [new mongoose.Types.ObjectId("569ed8269353e9f4c51617ac")];
    sender.friendRequests = [
      {
        user: new mongoose.Types.ObjectId("569ed8269353e9f4c51617ad"),
        status: "outgoing",
      },
      {
        user: new mongoose.Types.ObjectId("569ed8269353e9f4c51617ae"),
        status: "incoming",
      },
      {
        user: new mongoose.Types.ObjectId("569ed8269353e9f4c51617af"),
        status: "deleted",
      },
    ];
  });
  test("Return null when no clashing entires exist", () => {
    expect(
      checkExistingEntries(recipient._id, sender.friends, sender.friendRequests)
    ).toBe(null);
  });
});
