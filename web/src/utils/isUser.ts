import { User } from "../types";

export function isUser(obj: unknown): obj is User {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "_id" in obj &&
    "fullName" in obj &&
    "userName" in obj &&
    "password" in obj &&
    "email" in obj &&
    "createdAt" in obj &&
    "updatedAt" in obj &&
    "friends" in obj &&
    "friendRequests" in obj
  );
}
