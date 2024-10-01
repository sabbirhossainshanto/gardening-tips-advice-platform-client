"use server";

import nexiosInstance from "@/src/lib/NexiosInstance";
import { IPost, IUpdateVote } from "@/src/types";
import { NexiosResponse } from "nexios-http/types/interfaces";
import { revalidateTag } from "next/cache";

interface ISinglePostResponseType {
  success: boolean;
  message: string;
  data: IPost;
}

export const upvoteOrDownvote = async (payload: IUpdateVote) => {
  try {
    const { data }: NexiosResponse<ISinglePostResponseType> =
      await nexiosInstance.put(`/posts/vote`, payload);
    revalidateTag("post");
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const addToBookmark = async (payload: { postId: string }) => {
  try {
    const { data }: NexiosResponse<ISinglePostResponseType> =
      await nexiosInstance.put(`/posts/bookmark`, payload);
    revalidateTag("post");
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deletePost = async (id: string) => {
  try {
    const { data }: NexiosResponse<ISinglePostResponseType> =
      await nexiosInstance.delete(`/posts/${id}`);
    revalidateTag("post");
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getSinglePost = async (id: string) => {
  try {
    const { data }: NexiosResponse<ISinglePostResponseType> =
      await nexiosInstance.get(`/posts/${id}`);
    // console.log("single post", data);
    console.log("single post", id);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
