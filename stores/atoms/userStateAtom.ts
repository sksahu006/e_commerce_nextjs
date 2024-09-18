import { atom } from 'recoil';

export interface User {
  email: string;
  username?:String;
}

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});

export const loadingState = atom<boolean>({
  key: 'loadingState',
  default: false,
});