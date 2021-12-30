import { atom } from "recoil";

export const playlistIdState = atom<string | null>({
  key: "playlistIdState",
  default: null,
});
