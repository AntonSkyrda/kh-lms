import Cookies from "js-cookie";
import type { AuthResponse } from "../../schemas/authSchema";

export const saveToken = (token: AuthResponse) => {
  Cookies.set("_auth_access", token.access, {
    type: "Bearer",
    expires: 7,
    secure: true,
    sameSite: "strict",
  });
  Cookies.set("_auth_refresh", token.refresh, {
    type: "Bearer",
    expires: 7,
    secure: true,
    sameSite: "strict",
  });
};

type returnObjType = { access: string; refresh: string, token_type: "bearer" };
export const getToken = () => {
  const token = Cookies.get("_auth_access");
  const tokenRefresh = Cookies.get("_auth_refresh");
  if (!token || !tokenRefresh) return;
  const returnObj: returnObjType = {
    access: token,
    refresh: tokenRefresh,
    token_type: "bearer",
  };
  return returnObj;
};

export const removeToken = () => {
  Cookies.remove("_auth_access");
  Cookies.remove("_auth_refresh");
};
