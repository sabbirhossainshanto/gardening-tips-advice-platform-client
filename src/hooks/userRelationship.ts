import { useMutation, useQuery } from "@tanstack/react-query";
import { IResponse, IUserRelationship } from "../types";
import {
  createRelationship,
  getMyFollowers,
  getMyFollowings,
  getPendingFriend,
  getSingleFollowing,
  unFollowUser,
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
    queryKey: ["my-pending"],
    queryFn: async () => await getPendingFriend(),
  });
};
export const useUnFollowUser = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["unFollowUser"],
    mutationFn: async (id: string) => await unFollowUser(id),
  });
};
