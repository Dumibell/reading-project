import { atom } from "recoil";

export const initAtom = atom({
  key: "init",
  default: false,
});

export const userObjAtom = atom({
  key: "userObj",
  default: null,
});
