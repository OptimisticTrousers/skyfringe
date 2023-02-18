export interface Error {
  message: string;
}

export interface FormError {
  msg: string;
}

export interface FormErrors {
  errors: FormError[];
}

export interface FormData {
  fullName: string;
  userName: string;
  email: string;
  password: string;
}

export interface User {
  _id: string;
  fullName: string;
  userName: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}