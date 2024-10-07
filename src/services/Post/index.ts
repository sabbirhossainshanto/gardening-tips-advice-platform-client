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

export const createPost = async (payload: Partial<IPost>) => {
  try {
    const { data }: any = await nexiosInstance.post(
      `/posts/create-post`,
      payload
    );
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updatePost = async (payload: any) => {
  try {
    const { data }: any = await nexiosInstance.put(
      `/posts/update-post/${payload?.id}`,
      payload.data
    );
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

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

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllPost = async (query: any) => {
  try {
    const params = new URLSearchParams();
    if (query?.searchTerm) {
      params.append("searchTerm", query.searchTerm);
    }
    if (query?.sort) {
      params.append("sort", query.sort);
    }
    if (query?.filter) {
      params.append("filter", query.filter);
    }
    // if (query?.limit) {
    //   params.append("limit", query.limit);
    // }
    // if (query?.page) {
    //   params.append("page", query.page);
    // }

    const { data }: any = await nexiosInstance.get(`/posts`, {
      params,
    });

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUpvotersForMyPosts = async () => {
  try {
    const { data }: any = await nexiosInstance.get(`/posts/users/upvoters`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getMyMyPosts = async () => {
  try {
    const { data }: any = await nexiosInstance.get(`/profile/get-my-post`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
