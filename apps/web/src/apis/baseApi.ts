import axios from "axios";

const BASE_URL = "http://localhost:8000";

const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

// const axiosPrivate = axios.create({
//   baseURL: BASE_URL,
//   headers: { "Content-Type": "application/json" },
//   withCredentials: true,
// });

const baseApi = axiosPublic;

export default baseApi;
