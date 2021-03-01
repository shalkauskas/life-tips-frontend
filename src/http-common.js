import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});
