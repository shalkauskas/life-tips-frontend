import http from "../http-common";
// Create a new Post
const create = (data) => {
  return http.post("/post", data);
};
// Retrieve all Posts
const getAll = (page, order) => {
  return http.get(`/post/update?page=${page}&order=${order}`);
};
// Retrieve all Published Posts
const getAllPublished = (page, order) => {
  return http.get(`/explore?page=${page}&order=${order}`);
};
// Retrieve a single Post with id
const get = (id) => {
  return http.get(`/post/${id}`);
};
// Retrieve a single Post with id for update (not used?)
const getUpdate = (id) => {
  return http.get(`/post/update/${id}`);
};
// Update a Post with id
const update = (id, data) => {
  return http.put(`/post/update/${id}`, data);
};
const updateMany = (data) => {
  return http.put(`/post/update/`, data);
};
// Delete a Post with id
const remove = (id) => {
  return http.delete(`/post/update/${id}`);
};
// Delete all Posts
const removeAll = () => {
  return http.delete(`/post/update`);
};

const findBySearch = (query, page) => {
  return http.get(`/explore?title=${query}&page=${page}`);
};
const userLiked = (id) => {
  return http.get(`/explore?user=${id}`);
};
const addComment = (id, data) => {
  return http.post(`/post/${id}`, data);
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
  userLiked,
  addComment,
};
