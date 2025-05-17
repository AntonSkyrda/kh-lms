import Cookies from "js-cookie";

// export const saveToken = (token: AuthResponse) => {
//   Cookies.set("_auth_access", token.access, {
//     type: "Bearer",
//     expires: 7,
//     secure: true,
//     sameSite: "strict",
//   });
//   Cookies.set("_auth_refresh", token.refresh, {
//     type: "Bearer",
//     expires: 7,
//     secure: true,
//     sameSite: "strict",
//   });
// };

type returnObjType = { access: string; refresh: string; token_type: "bearer" };

export const getToken = () => {
  const token = Cookies.get("access_token");
  const tokenRefresh = Cookies.get("refresh_token");
  if (!token || !tokenRefresh) return;
  const returnObj: returnObjType = {
    access: token,
    refresh: tokenRefresh,
    token_type: "bearer",
  };
  return returnObj;
};

export const removeToken = () => {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
};
