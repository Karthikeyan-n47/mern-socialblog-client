import axios from "axios";

const API = axios.create({
  withCredentials: true,
  baseURL: "https://mern-socialblog-api.vercel.app/api",
});

export default API;
