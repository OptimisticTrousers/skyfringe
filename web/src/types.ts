interface Image {
  imageUrl: string;
  altText: string;
}

export interface Error {
  message: string;
}

export interface FormError {
  msg: string;
  value: string;
  param: string;
  location: string;
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

export interface User {
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
  friendCount: number;
  photo?: {
    imageUrl: string;
    altText: string;
  };
  cover?: {
    imageUrl: string;
    altText: string;
  };
}

export interface Comment {
  user: string;
  content: string;
  likes: User[];
}

export interface Post {
  _id: string;
  author: User;
  content: string;
  comments: Comment[];
  likes: User[];
  photo?: Image;
  createdAt: Date;
  updatedAt: Date;
}
