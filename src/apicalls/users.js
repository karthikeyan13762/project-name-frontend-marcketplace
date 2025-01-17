import { axiosInstance } from "./axiosInstance";

// register user here the spelling case is important so we usepasscal case mean P capital and C Capital
// ui file we are going to cammel case once smalland one capital letter
export const RegisterUser = async (paylod) => {
  try {
    const response = await axiosInstance.post("/api/users/register", paylod);
    // This is the structure inthe frontend for apicall ,menathisapi or business logic completly outside of the UI files for code level maintenence
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// similarly loginuser

export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/login", payload);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// get current user
// we are not sending any payload only the authorization will havethe headers

export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/api/users/get-current-user");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/api/users/get-users");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const UpdateUserStatus = async (userId, payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/users/update-user-status/" + userId,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
// wea call GetCurrentUser in Protectedpage
