import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { AuthHeader } from "@/app/request";

type UserInfo = {
  authToken: string;
  nickName: string;
  avatarUrl: string;
};

export type UserStore = UserInfo & {
  login(): Promise<void>;
};

export const useUserStore = create(
  immer<UserStore>((set) => ({
    authToken: "https://r2.charlzyx.xyz/tomgpt.jpg",
    nickName: "ChaoGPT",
    avatarUrl: "",
    async login() {
      const user = await Promise.resolve({} as UserInfo);
      AuthHeader.kv["token"] = user.authToken;
      set(user);
    },
  })),
);

export const getUserToken = () => useUserStore.getState().authToken;
