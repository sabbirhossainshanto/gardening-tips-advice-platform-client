export interface IUser {
    _id: string;
    name: string;
    email: string;
    mobileNumber: string;
    role: "USER" | "ADMIN";
    status: string;
    profilePhoto?: string;
    iat: number;
    exp: number;
  }
  