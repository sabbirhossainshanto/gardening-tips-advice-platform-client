"use server";

import nexiosInstance from "@/src/lib/NexiosInstance";

export const getPaymentHistory = async () => {
  try {
    const { data }: any = await nexiosInstance.get(`/payments`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
