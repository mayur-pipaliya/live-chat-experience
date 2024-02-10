import axios from "axios";
import { getToken } from "../context/AuthProvider";

const Axios = axios.create({ baseURL: process.env.REACT_APP_API_HOST });
// Request interceptor for API calls
Axios.interceptors.request.use(
  async (config) => {
    const token = getToken();
    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    console.log("errr");

    // move this code in condition you want
    // localStorage.clear();
    // window.location.reload();

    // window.location.href = "/";
    // const originalRequest = error.config;
    // if (error.response.status === 403 && !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   const access_token = await refreshAccessToken();
    //   axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
    //   return axiosApiInstance(originalRequest);
    // }
    return Promise.reject(error);
  }
);

export default Axios;
