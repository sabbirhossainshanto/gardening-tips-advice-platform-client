"use server";

import nexiosInstance from "@/src/lib/NexiosInstance";
import { ICommentPayload } from "@/src/types/comment";
import { revalidateTag } from "next/cache";

export const addComment = async (payload: ICommentPayload) => {
  try {
    const { data }: any = await nexiosInstance.post(
      `/comments/add-comment`,
      payload
    );
    revalidateTag("comment");
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllComment = async () => {
  try {
    const { data }: any = await nexiosInstance.get(`/comments`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getSingleComment = async (id: string) => {
  try {
    const { data }: any = await nexiosInstance.get(`/comments/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const editComment = async (payload: {
  data: ICommentPayload;
  id: string;
}) => {
  try {
    const { data }: any = await nexiosInstance.put(
      `/comments/edit-comment/${payload.id}`,
      payload?.data
    );
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteComment = async (id: string) => {
  try {
    const { data }: any = await nexiosInstance.delete(`/comments/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
