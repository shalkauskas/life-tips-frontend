import http from "../http-common";
import authHeader from "../utils/auth-header";
// Create a new Tutorial
const create = (data) => {
  return http.post("/tutorials", data);
};
// Retrieve all Tutorials
const getAll = (userId) => {
  return http.get(`/tutorials/${userId}/update/`, { headers: authHeader() });
};
// Retrieve all Published Tutorials
const getAllPublished = () => {
  return http.get(`/tutorials`, { headers: authHeader() });
};
// Retrieve all User published Tutorials
// const getAllOfUser = (userId) => {
//   return http.get(`/tutorials/${userId}/update/`, { headers: authHeader() });
// };
// Retrieve a single Tutorial with id
const get = (id) => {
  return http.get(`/tutorials/${id}`, { headers: authHeader() });
};
// Retrieve a single Tutorial with id for update
const getUpdate = (id, userId) => {
  return http.get(`/tutorials/${userId}/update/${id}`, {
    headers: authHeader(),
  });
};
// Update a Tutorial with id
const update = (id, data, userId) => {
  return http.put(`/tutorials/${userId}/update/${id}`, data, {
    headers: authHeader(),
  });
};
// Delete a Tutorial with id
const remove = (id, userId) => {
  return http.delete(`/tutorials/${userId}/update/${id}`, {
    headers: authHeader(),
  });
};
// Delete all Tutorials
const removeAll = (userId) => {
  return http.delete(`/tutorials/${userId}/update`, { headers: authHeader() });
};

const findByTitle = (title) => {
  return http.get(`/tutorials?title=${title}`);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  // getAllOfUser,
  getAllPublished,
  get,
  getUpdate,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};
