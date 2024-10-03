import { IUser } from "./user";

export interface IPost {
  _id: string;
  title: string;
  description: string;
  user: IUser;
  imageUrl: string;
  category: string;
  content: string;
  isPremium: boolean;
  upvotes: IUser[];
  downvotes: IUser[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IUpdateVote {
  voteType: "upvote" | "downvote";
  userId: string;
  postId: string;
}
