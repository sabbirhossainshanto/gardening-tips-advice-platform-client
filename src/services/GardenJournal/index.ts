"use server";

import nexiosInstance from "@/src/lib/NexiosInstance";
import { IGardenJournal } from "@/src/types/garden-journal";

export const createGardenJournal = async (payload: any) => {
  try {
    const { data }: any = await nexiosInstance.post(
      `/garden-journals/create-garden-journal`,
      payload
    );
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllGardenJournal = async () => {
  try {
    const { data }: any = await nexiosInstance.get(`/garden-journals/`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getMyGardenJournal = async () => {
  try {
    const { data }: any = await nexiosInstance.get(
      `/garden-journals/my-garden-journal`
    );
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getSingleGardenJournal = async (id: string) => {
  try {
    const { data }: any = await nexiosInstance.get(`/garden-journals/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const updateSingleGardenJournal = async (payload: any) => {
  try {
    const { data }: any = await nexiosInstance.put(
      `/garden-journals/${payload.id}`,
      payload.data
    );
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteGardenJournal = async (id: string) => {
  try {
    const { data }: any = await nexiosInstance.delete(`/garden-journals/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
