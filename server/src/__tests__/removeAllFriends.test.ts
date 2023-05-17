import { removeAllFriends } from "../controllers/accountController";
import { User as IUser } from "../../types";
import User from "../models/user";
import { luffyId } from "../config/populateDB";
// Import db setup and teardown functionality
import "../config/testSeeds";

// User ID for user Peter Parker
const userId = luffyId.toString();

describe("Confirm user has friends in the database", () => {
  test("user has friends/friend requests", async () => {
    // Luffy has 1 total friend, with 3 requests. Therefore, 4 other users should have a reference to Peter. Those users are found below
    const friends = await User.find({ friends: userId });
    const friendRequests = await User.find({ "friendRequests.user": userId });
    expect(friends.length).toBe(1);
    expect(friendRequests.length).toBe(3);
  });
});

describe("removeAllFriends functionality", () => {
  beforeAll(() => removeAllFriends(userId));

  it("does not impact user's friend list", async () => {
    const user = (await User.findById(userId).exec()) as IUser;
    expect(user.friends.length).toBe(1);
    expect(user.friendRequests.length).toBe(3);
  });

  it("removes all references to the user in other user's friend lists", async () => {
    const friends = await User.find({ friends: userId });
    const friendRequests = await User.find({ "friendRequests.user": userId });
    expect(friends.length).toBe(0);
    expect(friendRequests.length).toBe(0);
  });
});
