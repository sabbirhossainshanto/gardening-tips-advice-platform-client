import { atom, useAtom } from "jotai";
const registerState = atom(false);
export const useShowRegisterModal = () => {
  return useAtom(registerState);
};
