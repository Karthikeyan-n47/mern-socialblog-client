import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-socialblog-api.vercel.app/api",
  withCredentials: true,
});

export default API;
