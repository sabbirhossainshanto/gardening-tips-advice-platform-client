"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addComment,
  deleteComment,
  editComment,
  getAllComment,
  getSingleComment,
} from "../services/Comment";
import { toast } from "sonner";
import { IComment } from "../types/comment";

interface ICommentResponse {
  success: boolean;
  message: string;
  data: IComment[];
}

interface ISingleCommentResponse {
  success: boolean;
  message: string;
  data: IComment;
}

export const useAddComment = () => {
  return useMutation<ICommentResponse, Error, any>({
    mutationKey: ["post_comment"],
    mutationFn: async (payload) => await addComment(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllComment = () => {
  return useQuery<any, Error, ICommentResponse>({
    queryKey: ["get_comments"],
    queryFn: async () => await getAllComment(),
  });
};

export const useGetSingleComment = (id: string) => {
  return useQuery<any, Error, ISingleCommentResponse>({
    queryKey: ["get_single_comment"],
    enabled: id ? true : false,
    queryFn: async () => await getSingleComment(id),
  });
};

export const useEditComment = () => {
  return useMutation<ICommentResponse, Error, any>({
    mutationKey: ["edit_comment"],
    mutationFn: async (payload) => await editComment(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteComment = () => {
  return useMutation<ICommentResponse, Error, any>({
    mutationKey: ["delete_comment"],
    mutationFn: async (id) => await deleteComment(id),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
