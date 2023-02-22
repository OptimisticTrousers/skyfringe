import { decodeBase64 } from "bcryptjs";
import mongoose from "mongoose";
import {
  clearMongoServer,
  initializeMongoServer,
  stopMongoServer,
} from "./mongoConfigTesting";
// Standard database setup and teardown. Do not clear between each test, as state is often required to persist between tests
beforeAll(() => initializeMongoServer());
afterAll(async () => {
  await clearMongoServer();
  await stopMongoServer();
});

// Explicitly define IDs here to make it easier to understand relationships in test db.
const luffyId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000004");
const zoroId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000005");
const namiId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000006");
const usoppId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000007");
const sanjiId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000008");
const chopperId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000009");
const robinId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000009");
const frankyId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000009");
const brookId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000009");
const jinbeiId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000009");

const luffyPostId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000010");

const luffyCommentId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000011");
const usoppCommentId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000012");
