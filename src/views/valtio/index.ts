import { type CartItem, type User } from "@prisma/client";
import { proxy } from "valtio";

export interface Profile {
  token: string;
  user: User;
}

export enum SortCriteria {
  Price = "Price",
  Name = "Name",
}

export enum SortOrder {
  Ascending = "ascending",
  Descending = "descending",
}

interface QueryString {
  offset: number;
  limit: number;
  search: string;
  lowerBound: number;
  upperBound: number;
  sortBy: SortCriteria;
  sortOrder: SortOrder;
}

export interface AppState {
  profile: Profile | null;
  injecting: boolean;
  queryString: QueryString;
}

export const appState = proxy<AppState>({
  profile: null,
  injecting: true,
  queryString: {
    offset: 0,
    limit: 9,
    search: "",
    lowerBound: 0,
    upperBound: 1000,
    sortBy: SortCriteria.Price,
    sortOrder: SortOrder.Ascending,
  },
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

  updateInjecting: (flag: boolean) => {
    appState.injecting = flag;
  },

  resetPagination: () => {
    appState.queryString.offset = 0;
  },

  updateQueryString: (queryString: QueryString) => {
    appState.queryString = queryString;
  },

  getQueryStrings: (): string => {
    let queryString = "";

    if (appState.queryString.offset !== 0) {
      queryString += queryString === "" ? "?" : "&";
      queryString += `offset=${appState.queryString.offset}`;
    }

    if (appState.queryString.limit !== 0) {
      queryString += queryString === "" ? "?" : "&";
      queryString += `limit=${appState.queryString.limit}`;
    }

    if (appState.queryString.search !== "") {
      queryString += queryString === "" ? "?" : "&";
      queryString += `search=${appState.queryString.search}`;
    }

    if (appState.queryString.lowerBound !== 0) {
      queryString += queryString === "" ? "?" : "&";
      queryString += `lowerBound=${appState.queryString.lowerBound}`;
    }

    if (appState.queryString.upperBound !== 0) {
      queryString += queryString === "" ? "?" : "&";
      queryString += `upperBound=${appState.queryString.upperBound}`;
    }

    if (appState.queryString.sortBy !== SortCriteria.Price) {
      queryString += queryString === "" ? "?" : "&";
      queryString += `sortBy=${appState.queryString.sortBy}`;
    }

    if (appState.queryString.sortOrder !== SortOrder.Ascending) {
      queryString += queryString === "" ? "?" : "&";
      queryString += `sortOrder=${appState.queryString.sortOrder}`;
    }

    return queryString;
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

  updateUserCart: (cart: CartItem[]) => {
    if (!appState.profile) {
      return;
    }
    appState.profile.user.cart = cart;
  },
};
