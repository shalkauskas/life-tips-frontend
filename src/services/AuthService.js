/* eslint-disable import/no-anonymous-default-export */
import http from "../http-common";
import authHeader from "../utils/auth-header";
import { isLogin } from "../utils/refreshToken";
const index = () => {
  return http.get("/", isLogin() ? { headers: authHeader() } : {});
};
const signIn = () => {
  return http.get("/signin", { headers: authHeader() });
};
export default {
  index,
  signIn,
};
