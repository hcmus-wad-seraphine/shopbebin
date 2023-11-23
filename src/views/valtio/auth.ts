import { proxy } from "valtio";

export enum Role {
  Admin = "admin",
  Basic = "basic",
}

export interface UserProfile {
  role: Role;
}

export interface AppState {
  profile: UserProfile | null;
}

export const appState = proxy<AppState>({
  profile: null,
});

export const appActions = {
  login: (profile: UserProfile) => {
    appState.profile = profile;
  },
  logout: () => {
    appState.profile = null;
  },
};
