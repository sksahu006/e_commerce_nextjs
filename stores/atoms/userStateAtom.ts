import { SafeUser } from "@/lib/types/schemaTypes";
import { atom } from "recoil";

export const userState = atom<SafeUser | null>({
  key: "userState",
  default: null,
});

export const loadingState = atom<boolean>({
  key: "loadingState",
  default: false,
});