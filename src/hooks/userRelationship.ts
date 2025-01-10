import { useMutation, useQuery } from "@tanstack/react-query";
import { IResponse, IUserRelationship } from "../types";
import {
  createRelationship,
  getMyFollowers,
  getMyFollowings,
  getMyFriends,
  getPendingFriend,
  getSingleFollowing,
  unFollowUser,
  updatePendingFriend,
} from "../services/userRelationship";

export const useCreateRelationship = () => {
  return useMutation<IResponse<IUserRelationship>, Error, any>({
    mutationKey: ["add-relation"],
    mutationFn: async (payload) => await createRelationship(payload),
  });
};

export const useGetMyFollowers = () => {
  return useQuery<any, Error, IResponse<IUserRelationship[]>>({
    queryKey: ["my-followers"],
    queryFn: async () => await getMyFollowers(),
  });
};
export const useGetMyFollowings = () => {
  return useQuery<any, Error, IResponse<IUserRelationship[]>>({
    queryKey: ["my-followings"],
    queryFn: async () => await getMyFollowings(),
  });
};
export const useGetMySingleFollowing = (id: string) => {
  return useQuery<any, Error, IResponse<IUserRelationship>>({
    queryKey: ["my-followings", id],
    queryFn: async () => await getSingleFollowing(id),
  });
};
export const useGetPendingFriend = () => {
  return useQuery<any, Error, IResponse<IUserRelationship[]>>({
    queryKey: ["my-pending=friend"],
    queryFn: async () => await getPendingFriend(),
  });
};
export const useUpdatePendingFriend = () => {
  return useMutation<any, Error, { type: "accept" | "reject"; userId: string }>(
    {
      mutationKey: ["update-pending-friend"],
      mutationFn: async (payload) => await updatePendingFriend(payload),
    }
  );
};
export const useGetMyFriend = () => {
  return useQuery<any, Error, IResponse<IUserRelationship[]>>({
    queryKey: ["my-friend"],
    queryFn: async () => await getMyFriends(),
  });
};
export const useUnFollowUser = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["unFollowUser"],
    mutationFn: async (id: string) => await unFollowUser(id),
  });
};
