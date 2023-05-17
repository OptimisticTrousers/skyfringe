import { removeUser } from "../controllers/accountController";
import User from "../models/user";
import Comment from "../models/comment";
import Post from "../models/post";
import { luffyId } from "../config/populateDB";
// Import db setup and teardown functionality
import "../config/testSeeds";

// User ID for user Monkey D. Luffy
const userId = luffyId.toString();

describe("Confirm user has expanded presence in the database", () => {
  test("if user exists", async () => {
    // Find all posts and comments the user has liked
    const user = await User.findById(userId);
    expect(user).toBeDefined();
  });
});

describe("removeUser functionality", () => {
  beforeAll(() => removeUser(userId));

  it("removes all user's posts", async () => {
    // Find all posts made by the user
    const posts = await Post.find({ author: userId });
    expect(posts.length).toBe(0);
  });

  it("removes all user's comments", async () => {
    // Find all comments made by the user
    const comments = await Comment.find({ author: userId });
    expect(comments.length).toBe(0);
  });

  it("removes user", async () => {
    // Find user
    const user = await User.findById(userId);
    expect(user).toBeNull();
  });
});
