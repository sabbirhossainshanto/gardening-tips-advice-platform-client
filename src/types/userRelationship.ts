import { IUser } from "./user";

export interface IUserRelationship {
  user: IUser;
  targetUser: IUser;
  friendRequestStatus: "pending" | "accepted" | "rejected";
  relationshipType: "follow" | "friend" | "none";
  isFollower: boolean;
  isFollowing: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
