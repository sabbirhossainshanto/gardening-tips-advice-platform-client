import { useMutation } from "@tanstack/react-query";
import { addToBookmark, deletePost, upvoteOrDownvote } from "../services/Post";
import { IUpdateVote } from "../types";
import { toast } from "sonner";

export const useAddVote = () => {
  return useMutation<any, Error, IUpdateVote>({
    mutationKey: ["POST_GARDEN"],
    mutationFn: async (payload: IUpdateVote) => await upvoteOrDownvote(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useAddBookmark = () => {
  return useMutation<any, Error, { postId: string }>({
    mutationKey: ["Bookmark"],
    mutationFn: async (payload: { postId: string }) =>
      await addToBookmark(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeletePost = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["POST"],
    mutationFn: async (id) => await deletePost(id),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
