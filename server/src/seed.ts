import bcrypt from 'bcryptjs';
import User from './models/user';
import Post from './models/post';
import Comment from './models/comment';
import mongoConfig from './config/db';

async function seed() {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('NODE_ENV must equal "test"!');
  }

  try {
    await mongoConfig();

    console.log('Resetting database...');
    await Promise.all([
      User.deleteMany({}),
      Post.deleteMany({}),
      Comment.deleteMany({}),
    ]);

    console.log('Seeding users...');

    const passwordHash = await bcrypt.hash('password', 11);

    const exampleUser = new User({
      name: 'Example Test',
      email: 'example@example.com',
      username: 'example',
      passwordHash,
      profilePicture: 'tckqw4nglwleb7ngz8qz',
      isEmailVerified: true,
    });

    const seedUser = new User({
      name: 'Jonathan Seed',
      email: 'seed@example.com',
      username: 'jonathanseed',
      passwordHash,
      profilePicture: 'bhfuf041l0daetumeaxj',
      isEmailVerified: true,
    });

    // Save seeded users
    await Promise.all([exampleUser.save(), seedUser.save()]);

    console.log('Done!');
    process.exit(0);
  } catch (error) {
    console.error('An error occurred while seeding the database:', error);
  }
}

seed();