"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addNewsFeed,
  deleteNewsFeed,
  editNewsFeed,
  getAllNewsFeed,
  getSingleNewsFeed,
} from "../services/newsFeed";
import { INewsFeed, IResponse } from "../types";

export const useAddNewsFeed = () => {
  return useMutation<IResponse<INewsFeed>, Error, FormData>({
    mutationKey: ["newsFeed"],
    mutationFn: async (payload) => await addNewsFeed(payload),
  });
};

export const useGetAllNewsFeed = () => {
  return useQuery<any, Error, IResponse<INewsFeed[]>>({
    queryKey: ["all-news-feed"],
    queryFn: async () => await getAllNewsFeed(),
  });
};

export const useGetSingleNewsFeed = (id: string) => {
  return useQuery<any, Error, IResponse<INewsFeed>>({
    queryKey: ["get_single_news-feed", id],
    enabled: id ? true : false,
    queryFn: async () => await getSingleNewsFeed(id),
  });
};

export const useEditNewsFeed = () => {
  return useMutation<IResponse<INewsFeed>, Error, any>({
    mutationKey: ["edit_feed"],
    mutationFn: async (payload) => await editNewsFeed(payload),
  });
};

export const useDeleteNewsFeed = () => {
  return useMutation<IResponse<INewsFeed>, Error, any>({
    mutationKey: ["delete_feed"],
    mutationFn: async (id) => await deleteNewsFeed(id),
  });
};
