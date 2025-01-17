import axios from "axios";

//  axiosInstance as globalobject
export const axiosInstance = axios.create({
  baseURL: "https://project-name-backend-marcketplace.onrender.com",
  headers: {
    // "Content-Type": "application/json", // Default content type
    // this is the standerd way to sendingtheauthorizationto the backend
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
