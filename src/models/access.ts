import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type AccessItem = {
  id: number;
  rule?: string;
};

export type AccessStore = {
  list: AccessItem[];
  updateAccessList(neo: AccessItem[]): void;
};

export const useAccessStore = create(
  immer<AccessStore>((set) => ({
    list: [],
    updateAccessList(neo) {
      set((store) => {
        store.list = neo;
      });
    },
  })),
);
