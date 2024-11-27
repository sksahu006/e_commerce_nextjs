
import { atom } from "recoil";
type SafeUser = {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}
export const userState = atom<SafeUser | null>({
  key: "userState",
  default: null,
});

export const loadingState = atom<boolean>({
  key: "loadingState",
  default: false,
});