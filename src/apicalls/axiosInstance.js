// import axios from "axios";

// //  axiosInstance as globalobject
// export const axiosInstance = axios.create({
//   baseURL: "https://project-name-backend-marcketplace.onrender.com",
//   headers: {
//     // "Content-Type": "application/json", // Default content type
//     // this is the standerd way to sendingtheauthorizationto the backend
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//   },
// });

import axios from "axios";

// Create an axios instance
export const axiosInstance = axios.create({
  baseURL: "https://project-name-backend-marcketplace.onrender.com",
});

// Adding request interceptor to include Authorization header dynamically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Add token dynamically
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
