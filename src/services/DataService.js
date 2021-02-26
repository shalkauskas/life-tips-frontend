import http from "../http-common";
// Create a new Joke
const create = (data) => {
  return http.post("/joke", data);
};
// Retrieve all Jokes
const getAll = (page, order) => {
  return http.get(`/joke/update?page=${page}&order=${order}`);
};
// Retrieve all Published Jokes
const getAllPublished = (page, order) => {
  return http.get(`/explore?page=${page}&order=${order}`);
};
// Retrieve a single Joke with id
const get = (id) => {
  return http.get(`/joke/${id}`);
};
// Retrieve a single Joke with id for update (not used?)
const getUpdate = (id) => {
  return http.get(`/joke/update/${id}`);
};
// Update a Joke with id
const update = (id, data) => {
  return http.put(`/joke/update/${id}`, data);
};
const updateMany = (data) => {
  return http.put(`/joke/update/`, data);
};
// Delete a Joke with id
const remove = (id) => {
  return http.delete(`/joke/update/${id}`);
};
// Delete all Jokes
const removeAll = () => {
  return http.delete(`/joke/update`);
};

const findBySearch = (query, page) => {
  return http.get(`/explore?title=${query}&page=${page}`);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  getAllPublished,
  get,
  getUpdate,
  create,
  update,
  updateMany,
  remove,
  removeAll,
  findBySearch,
};
