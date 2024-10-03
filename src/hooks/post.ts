import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addToBookmark,
  createPost,
  deletePost,
  getAllPost,
  getSinglePost,
  getUpvotersForMyPosts,
  upvoteOrDownvote,
} from "../services/Post";
import { IPost, IUpdateVote, IUser } from "../types";
import { toast } from "sonner";

interface IPostProps {
  message: string;
  success: boolean;
  data: IPost;
}
interface IUpvotersProps {
  message: string;
  success: boolean;
  data: IUser[];
}

export const useCreatePost = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (payload: Partial<IPost>) => await createPost(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

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
  });
};

export const useGetAllPost = (query: any) => {
  return useQuery<any, Error, any>({
    queryKey: [`GET_ALL_POST`, query],
    queryFn: async () => await getAllPost(query),
  });
};

export const useGetUpvoters = (email: string) => {
  return useQuery<any, Error, IUpvotersProps>({
    queryKey: [`upvoters`],
    enabled: email ? true : false,
    queryFn: async () => await getUpvotersForMyPosts(),
  });
};
