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

export interface User {
  _id: string;
  fullName: string;
  userName: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  friends?: User[];
  photo?: Image;
  cover?: Image;
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
  image?: Image;
  createdAt: Date;
  updatedAt: Date;
}
