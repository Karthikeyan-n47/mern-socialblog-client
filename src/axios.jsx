import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-socialblog.onrender.com/api",
  withCredentials: true,
});

export default API;
