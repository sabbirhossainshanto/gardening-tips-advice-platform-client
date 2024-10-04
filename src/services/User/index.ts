"use server";

import nexiosInstance from "@/src/lib/NexiosInstance";
import { IUpdateUserData } from "@/src/types";

export const getAllUsers = async () => {
  try {
    const { data }: any = await nexiosInstance.get("/users");
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateUser = async (payload: IUpdateUserData) => {
  try {
    const { data }: any = await nexiosInstance.put(
      `/users/update-user/${payload.id}`,
      payload.data
    );
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getMonthlyStats = async () => {
  try {
    const { data }: any = await nexiosInstance.get(`/users/stats/monthly`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
