import http from "../http-common";
// Create a new Tutorial
const create = (data) => {
  return http.post("/tutorials", data);
};
// Retrieve all Tutorials
const getAll = () => {
  return http.get(`/tutorials/update/`);
};
// Retrieve all Published Tutorials
const getAllPublished = () => {
  return http.get(`/tutorials`);
};
// Retrieve all User published Tutorials
// const getAllOfUser = (userId) => {
//   return http.get(`/tutorials/${userId}/update/`, { headers: authHeader() });
// };
// Retrieve a single Tutorial with id
const get = (id) => {
  return http.get(`/tutorials/${id}`);
};
// Retrieve a single Tutorial with id for update (not used?)
const getUpdate = (id) => {
  return http.get(`/tutorials/update/${id}`);
};
// Update a Tutorial with id
const update = (id, data) => {
  return http.put(`/tutorials/update/${id}`, data);
};
// Delete a Tutorial with id
const remove = (id) => {
  return http.delete(`/tutorials/update/${id}`);
};
// Delete all Tutorials
const removeAll = () => {
  return http.delete(`/tutorials/update`);
};

const findBySearch = (query) => {
  return http.get(`/tutorials?title=${query}`);
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
  findBySearch,
};
