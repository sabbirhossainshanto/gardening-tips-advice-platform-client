import { atom, useAtom } from "jotai";
const changePasswordState = atom(false);
export const useChangePasswordModal = () => {
  return useAtom(changePasswordState);
};
