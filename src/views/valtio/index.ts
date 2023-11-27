import { type User } from "@prisma/client";
import { proxy } from "valtio";

export interface Profile {
  jwt: string;
  user: User;
}

export interface AppState {
  profile: Profile | null;
}

export const appState = proxy<AppState>({
  profile: null,
});

export const appActions = {
  login: (profile: Profile) => {
    appState.profile = profile;
  },
  logout: () => {
    appState.profile = null;
  },
};
