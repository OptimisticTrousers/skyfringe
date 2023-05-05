import { Document, Types } from "mongoose";

export interface Image {
  imageUrl: string;
  altText: string;
}

export interface FriendRequestWithStringId {
  user: UserWithStringId;
  status: string;
}

export interface FriendRequest {
  user: User;
  status: string;
}

export interface UserWithStringId {
  _id: string;
  facebookId?: string;
  fullName: string;
  userName: string;
  password: string;
  email: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
  friends: UserWithStringId[];
  friendRequests: FriendRequestWithStringId[];
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

export interface User extends Document {
  _id: Types.ObjectId;
  facebookId?: string;
  fullName: string;
  userName: string;
  password: string;
  email: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
  friends: User[];
  friendRequests: FriendRequest[];
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

export interface CommentWithStringId {
  _id: string;
  post: Post;
  author: User;
  content: string;
  likes: User[];
}

export interface Comment extends Document {
  _id: Types.ObjectId;
  post: Post;
  author: User;
  content: string;
  likes: User[];
}

export interface PostWithStringId {
  _id: string;
  author: UserWithStringId;
  content: string;
  likes: UserWithStringId[];
  photo?: Image;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post extends Document {
  _id: Types.ObjectId;
  author: User;
  content: string;
  likes: User[];
  photo?: Image;
  createdAt: Date;
  updatedAt: Date;
}

export interface Error {
  message: string;
}

export interface FormError {
  msg: string;
  value?: string;
  param?: string;
  location?: string;
}

export interface RegisterData {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  passwordConf: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface PostData {
  content: string;
}

export interface CommentData {
  content: string;
}

export interface FetchResponse {
  loading: boolean;
  error: unknown;
}

export interface FetchFriendsResponse extends FetchResponse {
  data: {
    friends: UserWithStringId[];
    friendRequests: FriendRequestWithStringId[];
  } | null;
}
