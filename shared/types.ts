import { Document } from "mongoose";

interface Image {
  imageUrl: string;
  altText: string;
}

export interface User extends Document {
  facebookId?: string;
  _id: string;
  fullName: string;
  userName: string;
  password: string;
  email: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
  friends: User[] | [];
  friendRequests: User[] | [];
  friendCount?: number;
  photo?: {
    imageUrl: string;
    altText: string;
  };
  cover?: {
    imageUrl: string;
    altText: string;
  };
}

export interface Comment extends Document {
  post: Post;
  author: User;
  content: string;
  likes: User[];
}

export interface Post extends Document {
  _id: string;
  author: User;
  content: string;
  likes: User[];
  photo?: Image;
  createdAt: Date;
  updatedAt: Date;
}
