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

export const GetProducts = async (filters) => {
  try {
    const response = await axiosInstance.post(
      "/api/products/get-products",
      filters
    );

    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const EditProduct = async (id, payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/products/edit-product/" + id,
      payload
    );

    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const DeleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(
      "/api/products/delete-product/" + id
    );

    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const UploadImage = async (formData) => {
  try {
    const response = await axiosInstance.post(
      "/api/products/upload-image-to-product",
      formData
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const DeleteImage = async (productId, imageUrl) => {
  try {
    const response = await axiosInstance.post(
      "/api/products/delete-image-from-product",
      {
        productId,
        imageUrl,
      }
    );

    if (response.data.success) {
      alert("Image deleted successfully");
      return response.data;
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    alert("Failed to delete the image");
    return { success: false, message: error.message };
  }
};

// update productstatus
export const UpdateProductStatus = async (id, { status }) => {
  try {
    const response = await axiosInstance.put(
      `/api/products/update-product-status/${id}`,
      { status }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// get productby id
export const GetProductById = async (id) => {
  try {
    const response = await axiosInstance.get(
      "/api/products/get-product-by-id/" + id
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const PlaceNewBid = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/bids/place-new-bid",
      payload
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.message || "An error occurred." };
  }
};
//  get all bids

export const GetAllBids = async (filters) => {
  try {
    const response = await axiosInstance.post("/api/bids/get-all-bids", {
      filters,
    });

    return response.data;
  } catch (error) {
    return error.message;
  }
};
// go to the model popup
