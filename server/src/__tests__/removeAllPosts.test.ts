import Post from "../models/post";
import { removeAllPosts } from "../controllers/accountController";
import { luffyId, luffyPostId } from "../config/populateDB";
// Import db setup and teardown functionality
import "../config/testSeeds";

// User ID for user Monkey D. Luffy
const userId = luffyId.toString();

// Post IDs for all posts by luffy
const postIds = [luffyPostId];

describe("Confirm user has posts in the database", () => {
  test("user has 1 post", async () => {
    // Luffy has 1 total friend, with 3 requests. Therefore, 4 other users should have a reference to Peter. Those users are found below
    const posts = await Post.find({ authopr: userId });
    expect(posts.length).toBe(1);
  });
});

describe("removeAllPosts functionality", () => {
  beforeAll(() => removeAllPosts(userId));

  it("removes all posts associated with a user", async () => {
    // Find all of the posts made by user
    const posts = await Post.find({ author: userId });
    expect(posts.length).toBe(1);
  });
});
