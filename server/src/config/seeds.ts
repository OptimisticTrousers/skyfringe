import User from "../models/user";
import Post from "../models/post";
import Comment from "../models/comment";
import mongoConfig from "./db";
// Importing file that populates mock data for the database
import { populate } from "./populateDB";

mongoConfig();

// Deleting all of the documents in each collection in the database for the real Mongo database
(async () => {
  try {
    console.log("Resetting database...");
    await Promise.all([
      User.deleteMany({}),
      Post.deleteMany({}),
      Comment.deleteMany({}),
    ]);
    console.log("Successfully reset database");
    await populate();
  } catch (err) {
    console.log(
      `An error occurred while deleting all of the documents in the database: ${err}`
    );
  }
})();
