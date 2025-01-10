"use server";

import nexiosInstance from "@/src/lib/NexiosInstance";
import { IUserRelationship } from "../types";
import { AxiosSecure } from "../lib/AxiosSecure";

export const createRelationship = async (
  payload: Partial<IUserRelationship>
) => {
  try {
    const { data }: any = await AxiosSecure.post(
      `/user-relationship/create-relationship`,
      payload
    );

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getMyFollowers = async () => {
  try {
    const { data }: any = await nexiosInstance.get(
      `/user-relationship/followers`
    );
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getMyFollowings = async () => {
  try {
    const { data }: any = await nexiosInstance.get(
      `/user-relationship/followings`
    );
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getSingleFollowing = async (id: string) => {
  try {
    const { data }: any = await nexiosInstance.get(
      `/user-relationship/following/${id}`
    );
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const unFollowUser = async (id: string) => {
  try {
    const { data }: any = await nexiosInstance.delete(
      `/user-relationship/unfollow/${id}`
    );
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getPendingFriend = async () => {
  try {
    const { data }: any = await nexiosInstance.get(
      `/user-relationship/pending-friend`
    );
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const updatePendingFriend = async (payload: {
  type: "accept" | "reject";
  userId: string;
}) => {
  try {
    const { data }: any = await nexiosInstance.put(
      `/user-relationship/pending-friend`,
      payload
    );
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getMyFriends = async () => {
  try {
    const { data }: any = await nexiosInstance.get(
      `/user-relationship/friends`
    );
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
