import { IUser } from "./user";

export interface IGardenJournal {
  title: string;
  user: IUser;
  content: string;
  image: string;
  isPublic: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
