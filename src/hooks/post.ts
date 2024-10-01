import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addToBookmark,
  deletePost,
  getSinglePost,
  upvoteOrDownvote,
} from "../services/Post";
import { IPost, IUpdateVote } from "../types";
import { toast } from "sonner";

interface IPostProps {
  message: string;
  success: boolean;
  data: IPost;
}

export const useAddVote = () => {
  return useMutation<any, Error, IUpdateVote>({
    mutationKey: ["ADD_VOTE"],
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
    mutationKey: ["DELETE_POST"],
    mutationFn: async (id) => await deletePost(id),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetSInglePost = (id: string) => {
  return useQuery<any, Error, IPostProps>({
    queryKey: [`SINGLE_POST${id}`],
    enabled: id ? true : false,
    queryFn: async () => await getSinglePost(id),
    // gcTime: 0,
  });
};
