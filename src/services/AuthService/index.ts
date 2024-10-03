"use server";

import nexiosInstance from "@/src/lib/NexiosInstance";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (payload: FieldValues) => {
  try {
    const { data }: any = await nexiosInstance.post("/auth/register", payload);
    if (data?.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
      return data;
    } else {
      throw new Error(data?.message);
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loginUser = async (payload: FieldValues) => {
  try {
    const { data }: any = await nexiosInstance.post("/auth/login", payload);
    if (data?.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
      return data;
    } else {
      throw new Error(data?.message);
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logOut = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  let decode = null;
  if (accessToken) {
    decode = await jwtDecode(accessToken);
    return {
      _id: decode?._id,
      name: decode?.name,
      email: decode?.email,
      mobileNumber: decode?.mobileNumber,
      role: decode?.role,
      status: decode?.status,
      iat: decode?.iat,
      exp: decode?.exp,
      profilePhoto: decode.profilePhoto,
      isVerified: decode?.isVerified,
      premiumStatus: decode?.premiumStatus,
      followers: decode?.followers,
      following: decode?.following,
      posts: decode?.posts,
      favorites: decode?.favorites,
      createdAt: decode?.createdAt,
      updatedAt: decode?.updatedAt,
      __v: decode?.__v,
    };
  }
  return decode;
};

export const getMe = async () => {
  try {
    const { data }: any = await nexiosInstance.get("/profile");
    if (data?.success) {
      return data;
    } else {
      throw new Error(data?.message);
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const changePassword = async (payload: FieldValues) => {
  try {
    const { data }: any = await nexiosInstance.post(
      "/auth/change-password",
      payload
    );
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
