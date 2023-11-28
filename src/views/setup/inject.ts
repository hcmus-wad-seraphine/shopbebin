import { appActions } from "@views/valtio";

const autoLoginWithToken = async () => {
  const token = localStorage.getItem("token");
  if (token != null) {
    await appActions.loginWithToken(token);
  } else {
    appActions.logout();
  }
};

export const inject = async () => {
  await autoLoginWithToken();
  appActions.updateInjecting(false);
};
