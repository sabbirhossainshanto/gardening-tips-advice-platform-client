"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import {
  createGardenJournal,
  deleteGardenJournal,
  getAllGardenJournal,
  getMyGardenJournal,
  getSingleGardenJournal,
  updateSingleGardenJournal,
} from "../services/GardenJournal";
import { toast } from "sonner";
import { IResponse } from "../types";
import { IGardenJournal } from "../types/garden-journal";

export const useCreateGardenJournal = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["post_journals"],
    mutationFn: async (payload) => await createGardenJournal(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteGardenJournal = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["delete_journal"],
    mutationFn: async (id) => await deleteGardenJournal(id),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetGardenJournal = () => {
  return useQuery<any, Error, IResponse<IGardenJournal[]>>({
    queryKey: ["get_journals"],
    queryFn: async () => await getAllGardenJournal(),
  });
};
export const useGetSingleGardenJournal = (id: string) => {
  return useQuery<any, Error, IResponse<IGardenJournal>>({
    queryKey: ["get_single_journal"],
    queryFn: async () => await getSingleGardenJournal(id),
  });
};
export const useUpdateSingleGardenJournal = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["update_single_journal"],
    mutationFn: async (payload: Partial<IGardenJournal>) =>
      await updateSingleGardenJournal(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetMyGardenJournal = () => {
  return useQuery<any, Error, IResponse<IGardenJournal[]>>({
    queryKey: ["get_my_journals"],
    queryFn: async () => await getMyGardenJournal(),
  });
};
