import { s3Deletev3 } from "../config/s3";
import Comment from "../models/comment";
import Post from "../models/post";
import User from "../models/user";

// This function has been delegated to its own module because of the complexity involved in this multi-step db query

// ! The order of deletion operations may be important, so follow the order of functions in this module

// Removes all instances of the user's ID from comment and post likes arrays
export const removeAllLikes = async (userId: string): Promise<void> => {
  // Remove all likes this user has submitted for all posts
  await Post.updateMany(
    { likes: userId }, // find all posts the user has liked
    { $pull: { likes: userId } } // remove the likes from the likes array
  );

  // Remove all likes this user has submitted for all comments
  await Comment.updateMany(
    { likes: userId }, // find all comments the user has liked
    { $pull: { likes: userId } } // remove the likes from the likes array
  );
};

// Removes all the user's posts, images associated with these posts, and comments associated with these posts
export const removeAllPosts = async (userId: string): Promise<void> => {
  // Find all posts by this user
  const posts = await Post.find({ author: userId });

  // Isolate those posts with images
  const postsWithImages = posts.filter(
    (post) => post.photo?.imageUrl !== undefined
  );

  // Isolate image URLs of these post images
  const imageURLs = postsWithImages.map(
    (post) => post.photo?.imageUrl
  ) as string[];

  // Remove bulk resources from AWS S3
  imageURLs.forEach(async (imageUrl: string) => {
    const path = imageUrl.substring(
      imageUrl.indexOf("facebook_clone") + "facebook_clone".length + 1
    );
    await s3Deletev3(path);
  });

  // Finally, remove all posts by this user
  await Post.deleteMany({ author: userId });
};

// Removes all comment documents made by the user and any references to these comments among all posts
export const removeAllComments = async (userId: string): Promise<void> => {
  // Remove all comments by this user
  await Comment.deleteMany({ author: userId });
};

// Removes all instances of the user from other users' friend lists
export const removeAllFriends = async (userId: string): Promise<void> => {
  await User.updateMany(
    { friends: userId }, // find all users with this user as a friend of some type
    { $pull: { friendRequest: userId } } // remove all friend entries for this user
  );

  await User.updateMany(
    { "friendRequests.user": userId }, // find all users with this user as a friend of some type
    { $pull: { friendRequests: { user: userId } } } // remove all friend entries for this user
  );
};

// Remove the user document and any images
export const removeUser = async (userId: string): Promise<void> => {
  // Ensure to use findOneAndDelete to return the deleted user (use information for AWS S3 destroy operation)
  const user = await User.findOneAndDelete({ _id: userId });

  // Remove avatar from AWS S3 if image exists
  const avatarImageUrl = user?.photo?.imageUrl;

  if (avatarImageUrl) {
    const path = avatarImageUrl.substring(
      avatarImageUrl.indexOf("facebook_clone") + "facebook_clone".length + 1
    );
    await s3Deletev3(path);
  }

  // Remove cover from AWS S3 if image exists
  const coverImageUrl = user?.cover?.imageUrl;

  if (coverImageUrl) {
    const path = coverImageUrl.substring(
      coverImageUrl.indexOf("facebook_clone") + "facebook_clone".length + 1
    );
    await s3Deletev3(path);
  }
};
