import { type CartItem, type User } from "@prisma/client";
import { proxy } from "valtio";

export interface Profile {
  token: string;
  user: User;
}

export interface AppState {
  profile: Profile | null;
  injecting: boolean;
}

export const appState = proxy<AppState>({
  profile: null,
  injecting: true,
});

export const appActions = {
  waitForInjecting: async () => {
    return await new Promise((resolve) => {
      const interval = setInterval(() => {
        if (!appState.injecting) {
          clearInterval(interval);
          resolve(true);
        }
      }, 100);
    });
  },

  updateProfile: (user: User) => {
    if (!appState.profile) {
      return;
    }
    appState.profile.user = user;
  },

  updateInjecting: (flag: boolean) => {
    appState.injecting = flag;
  },

  login: (profile: Profile) => {
    appState.profile = profile;
  },

  loginWithToken: async (token: string) => {
    try {
      const res = await fetch("/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user: User = await res.json();
      appState.profile = {
        token,
        user,
      };
    } catch (err) {
      appState.profile = null;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    appState.profile = null;
  },

  updateCart: (cart: CartItem[]) => {
    if (!appState.profile) {
      return;
    }
    appState.profile.user.cart = cart;
  },
};
