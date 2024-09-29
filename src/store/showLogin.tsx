import { atom, useAtom } from "jotai";
const loginState = atom(false);
export const useShowLoginModal = () => {
  return useAtom(loginState);
};
