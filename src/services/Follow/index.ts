"use server";

import nexiosInstance from "@/src/lib/NexiosInstance";
import { NexiosResponse } from "nexios-http/types/interfaces";
import { revalidateTag } from "next/cache";

export const followUser = async (payload: { followingId: string }) => {
  try {
    const { data }: NexiosResponse<any> = await nexiosInstance.put(
      `/follow/`,
      payload
    );
    revalidateTag("user");
    if (data?.success) {
      return data;
    } else {
      throw new Error(data?.data?.message);
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
