import axios from "axios";
import { BASE_URL } from "../../constants";

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use((config) => {
  const collegeAccessToken = localStorage.getItem("college");
  //checking if collegeAccessToken exists
  if (collegeAccessToken) {
    config.headers = config.headers ?? {};
    config.headers["authorization"] = collegeAccessToken;
  }
  return config;
});


const interceptor = instance.interceptors.response.use((res => res), err => {
  console.log(err)
  const originalRequest = err.config.data;
  // originalRequest._retry = true;
  if(err.response.status === 400 && err.response.data === "ACCESS_TOKEN_NOTFOUND"){
    window.location.href = "/college/login"
  }
  else if(err.response.status === 401 && err.response.data.name === 'TokenExpiredError'){
    // instance.interceptors.response.eject(interceptor);
    // let refreshToken = localStorage.getItem("refreshToken")
    // return axios.post("http://localhost:4000/api/auth/access/refresh", {
    //   refreshToken: refreshToken
    // }).then((res) => {
    //   console.log("Refresh token reponse :: ", res)
    //   let {accessToken, refreshToken} = res.data
    //   localStorage.setItem("accessToken", accessToken)
    //   localStorage.setItem("refreshToken", refreshToken)
    //   axios.defaults.headers.common['Authorization'] = accessToken;
    //   // err.response.config.headers["Authorization"] = accessToken;
    //   return instance.request(originalRequest)
    // }).catch((refreshTokenError) => {
    //   console.log("Refresh token Err :: ", refreshTokenError)
    //   // return Promise.reject(refreshTokenError);
    //   // window.location.href = "/login"
    // })
    localStorage.removeItem("collegeAccessToken")
    window.location.href = "/college/login"
  } else {
    return Promise.reject(err);
  }
})


export default instance;