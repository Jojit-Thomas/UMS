import axios from "axios";
import { BASE_URL } from "./Pages/constants";

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials : true
});

// instance.interceptors.request.use((config) => {
//   const accessToken = localStorage.getItem("accessToken");
//   //checking if accessToken exists
//   if (accessToken) {
//     config.headers = config.headers ?? {};
//     config.headers["authorization"] = accessToken;
//   }
//   return config;
// });

export default instance;