import React, { useEffect, useState } from "react";
import { UploadImage, DeleteImage } from "../../../apicalls/prodoucts";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../../redux/loaderSlice";

function Images({ selectedProduct, setShoModel, getData }) {
  const [images, setImages] = useState(selectedProduct?.images || []);

  const dispatch = useDispatch();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("productId", selectedProduct._id);

    try {
      dispatch(SetLoader(true));
      const response = await UploadImage(formData);
      dispatch(SetLoader(false));

      if (response.success) {
        alert("Image uploaded successfully");
        setImages((prevImages) => [...prevImages, response.result.secure_url]); // Update state with new image URL
        getData(); // Refresh data
      } else {
        alert(response.message || "Failed to upload image");
      }
    } catch (error) {
      dispatch(SetLoader(false));
      return { success: false, message: error.message };
    }
  };

  const handleDelete = async (imageUrl) => {
    try {
      dispatch(SetLoader(true));
      const response = await DeleteImage(selectedProduct._id, imageUrl);
      dispatch(SetLoader(false));

      if (response.success) {
        alert("Image deleted successfully");
        setImages(images.filter((img) => img !== imageUrl));
        getData(); // Refresh data
      } else {
        alert(response.message || "Failed to delete image");
      }
    } catch (error) {
      dispatch(SetLoader(false));

      return { success: false, message: error.message };
    }
  };
  useEffect(() => {
    setImages(selectedProduct?.images || []);
  }, [selectedProduct]);

  return (
    <div className="images-container">
      <div className="upload-section">
        <label htmlFor="image-upload" className="form-label mt-2 fw-bold">
          Upload Images
        </label>
        <input
          type="file"
          className="form-control"
          id="image-upload"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>

      <div className="images-list mt-4">
        {images.length > 0 ? (
          <div className="row">
            {images.map((image, index) => (
              <div className="col-4" key={index}>
                <div className="image-card">
                  <img
                    src={image}
                    // alt={`Product ${index + 1}`}
                    className="img-thumbnail"
                  />
                  <button
                    className="btn btn-danger btn-sm my-3"
                    onClick={() => handleDelete(image)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No images uploaded yet.</p>
        )}
      </div>
    </div>
  );
}

export default Images;
