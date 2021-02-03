import http from "../http-common";
import authHeader from "../utils/auth-header";
import { isLogin } from "../utils/refreshToken";

const getAll = () => {
  return http.get("/tutorials", isLogin() ? { headers: authHeader() } : {});
};

const get = (id) => {
  return http.get(`/tutorials/update/${id}`, { headers: authHeader() });
};

const create = (data) => {
  return http.post("/tutorials", data);
};

const update = (id, data) => {
  return http.put(`/tutorials/update/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/tutorials/${id}`);
};

const removeAll = () => {
  return http.delete(`/tutorials`);
};

const findByTitle = (title) => {
  return http.get(`/tutorials?title=${title}`);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};
