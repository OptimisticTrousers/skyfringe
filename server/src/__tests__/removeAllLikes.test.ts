import { removeAllLikes } from "../controllers/accountController";
import Post from "../models/post";
import Comment from "../models/comment";
import { luffyId } from "../config/populateDB";
// Import db setup and teardown functionality
import "../config/testSeeds";

// User ID for user Monkey D. Luffy
const userId = luffyId.toString();

describe("Confirm user has expanded presence in the database", () => {
  test("user has liked posts and comments", async () => {
    // Find all posts and comments the user has liked
    const posts = await Post.find({ likes: userId });
    const comments = await Comment.find({ likes: userId });
    expect(posts.length).toBe(1);
    expect(comments.length).toBe(3);
  });
});

describe("removeAllLikes functionality", () => {
  beforeAll(() => removeAllLikes(userId));

  it("removes all user's likes from posts", async () => {
    // Find all posts the user has liked
    const posts = await Post.find({ likes: userId });
    expect(posts.length).toBe(0);
  });

  it("removes all user's likes from comments", async () => {
    // Find all comments the user has liked
    const comments = await Comment.find({ likes: userId });
    expect(comments.length).toBe(0);
  });
});
