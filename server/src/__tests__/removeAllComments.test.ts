import { removeAllComments } from "../controllers/accountController";
import Comment from "../models/comment";
import {
  luffyCommentId,
  luffyId,
  luffySecondCommentId,
} from "../config/populateDB";
// Import db setup and teardown functionality
import "../config/testSeeds";

// User ID for user Monkey D. Luffy
const userId = luffyId.toString();

// Comment IDs for all comments by Luffy
const commentIds = [luffyCommentId, luffySecondCommentId];

describe("Confirm user has expanded presence in the database", () => {
  test("user has comments", async () => {
    // User Luffy should have 2 comments (written on different posts)
    const comments = await Comment.find({ _id: { $in: commentIds } });
    expect(comments.length).toBe(2);
  });
});

describe("removeAllComments functionality", () => {
  beforeAll(() => removeAllComments(userId));

  it("removes all user's comments", async () => {
    const comments = await Comment.find({ author: userId });
    expect(comments.length).toBe(0);
  });
});
