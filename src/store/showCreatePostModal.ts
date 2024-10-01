import { atom, useAtom } from "jotai";
const createPostState = atom(false);
export const useShowCreatePostModal = () => {
  return useAtom(createPostState);
};
