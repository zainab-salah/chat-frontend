import axios from "axios";



const apiUrl = import.meta.env.VITE_API_URL;
 
export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});


let accessToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  accessToken = token;
  if (token) {
    console.log("Setting Authorization Token:", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    console.log("Removing Authorization Token");
    delete api.defaults.headers.common["Authorization"];
  }
};


api.interceptors.request.use(
  (config) => {
    console.log("Intercepting request, using token:", accessToken);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
