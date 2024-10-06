import { atom, useAtom } from "jotai";
const forgotPasswordState = atom(false);
export const useShowForgotPasswordModal = () => {
  return useAtom(forgotPasswordState);
};
