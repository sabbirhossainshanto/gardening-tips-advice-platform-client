"use server";

import nexiosInstance from "@/src/lib/NexiosInstance";
import { INewsFeed } from "../types";
import { AxiosSecure } from "../lib/AxiosSecure";

export const addNewsFeed = async (payload: FormData) => {
  try {
    const { data }: any = await AxiosSecure.post(
      `/newsFeed/add-newsFeed`,
      payload
    );

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllNewsFeed = async () => {
  try {
    const { data }: any = await nexiosInstance.get(`/newsFeed`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getSingleNewsFeed = async (id: string) => {
  try {
    const { data }: any = await nexiosInstance.get(`/newsFeed/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const editNewsFeed = async (payload: {
  data: INewsFeed;
  id: string;
}) => {
  try {
    const { data }: any = await nexiosInstance.put(
      `/newsFeed/${payload.id}`,
      payload?.data
    );
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteNewsFeed = async (id: string) => {
  try {
    const { data }: any = await nexiosInstance.delete(`/newsFeed/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
