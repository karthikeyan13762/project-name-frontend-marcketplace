import { axiosInstance } from "./axiosInstance";

//  add a new product

// we get payload from the frontend

export const AddProduct = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/products/add-product",
      payload
    );

    return response.data;
  } catch (error) {
    return error.message;
  }
};

// ge tall products

export const GetProducts = async (payload) => {
  try {
    const response = await axiosInstance.get("/api/products/get-products");

    return response.data;
  } catch (error) {
    return error.message;
  }
};

// go to the model popup
