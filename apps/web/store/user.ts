import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUserStore } from "./types/user";
import { PERSIST_STATE } from "./constants/persist";

export const DEFAULT_STATE: IUserStore = {
  userProfile: undefined
}

const UserPersist = persist<IUserStore>(
  () => ({
    userProfile: undefined,
  }),
  { name: PERSIST_STATE.USER }
);

export const useUserStore = create<IUserStore>()(UserPersist);

export const setUser = (userData: IUserStore) =>
  useUserStore.setState(userData);

export const resetUserState = () => {
  useUserStore.setState(DEFAULT_STATE)
}