export interface IUser {
  _id: string;
  name: string;
  role: string;
  email: string;
  status: string;
  mobileNumber: string;
  profilePhoto: string;
  isVerified: boolean;
  premiumStatus: boolean;
  followers: IUser[];
  following: IUser[];
  posts: string[];
  favorites: string[];
  createdAt: string;
  updatedAt: string;
  iat: number;
  exp: number;
  __v: number;
}
