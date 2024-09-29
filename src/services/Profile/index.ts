'use server'

import nexiosInstance from "@/src/lib/NexiosInstance";
import { FieldValues } from "react-hook-form";

export const updateProfile = async (payload: FieldValues) => {
  try {
    const { data }: any = await nexiosInstance.put("/profile", payload);
    if (data?.success) {
      return data;
    } else {
      throw new Error(data?.message);
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
