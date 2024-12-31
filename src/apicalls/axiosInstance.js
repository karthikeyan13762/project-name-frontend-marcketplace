import axios from "axios";

//  axiosInstance as globalobject
export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    // "Content-Type": "application/json", // Default content type
    // this is the standerd way to sendingtheauthorizationto the backend
    Authorization: `Barer ${localStorage.getItem("token")} `,
  },
});
