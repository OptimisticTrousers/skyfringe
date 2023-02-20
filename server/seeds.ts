import { faker } from "@faker-js/faker";
import mongoConfig from "./src/config/db";
import Post from "./src/models/post";
import User from "./src/models/user";
import Comment from "./src/models/comment";

const createRandomUser = () => {
  return new User({
    fullName: faker.name.fullName(),
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  });
};

const seed = async () => {
  if (process.env.NODE_ENV !== "test") {
    throw new Error('NODE_ENV must equal "test"!');
  }
  try {
    mongoConfig();
    console.log("Resetting database...");
    await Promise.all([
      User.deleteMany({}),
      Post.deleteMany({}),
      Comment.deleteMany({}),
    ]);
    const user1 = createRandomUser();
    const user2 = createRandomUser();

    await Promise.all([user1.save(), user2.save()]);
    console.log("Done!");
    process.exit(0);
  } catch (error) {
    console.error(`An error occured while seeding the database: ${error}`);
  }
};

seed();
