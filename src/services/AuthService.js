/* eslint-disable import/no-anonymous-default-export */
import http from "../http-common";

const index = () => {
  return http.get("/");
};
const findUser = (id) => {
  return http.get(`/user/${id}`);
};
const login = (data) => {
  return http.post("/login", data);
};
const loginGoogle = () => {
  return http.get("/auth/google");
};
const admin = () => {
  return http.get(`/admin`);
};
const updateUser = (data) => {
  return http.post(`/dashboard/profile`, data);
};
const register = (data) => {
  return http.post("/register", data);
};
const logout = () => {
  return http.get("/logout");
};
export default {
  index,
  login,
  admin,
  updateUser,
  loginGoogle,
  register,
  logout,
  findUser,
};
