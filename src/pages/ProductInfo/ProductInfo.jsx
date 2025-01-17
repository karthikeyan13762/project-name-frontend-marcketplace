import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loaderSlice";
import { GetAllBids, GetProductById } from "../../apicalls/prodoucts";
import { useNavigate, useParams } from "react-router-dom";
import BidModel from "./BidModel";

function ProductInfo() {
  const { user } = useSelector((state) => state.users);
  const [showAddNewBid, setShowAddNewBid] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProductById(id);
      if (response.success) {
        const bidsResponse = await GetAllBids({ product: id });
        setProduct({ ...response.data, bids: bidsResponse.data });
      }
    } catch (error) {
      return error.message;
    } finally {
      dispatch(SetLoader(false));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    product && (
      <div className="container mt-4 vh-80">
        <div className="row">
          {/* Big Image */}
          <div className="col-md-6 d-flex justify-content-center align-items-center p-3">
            <img
              src={product.images[selectedImageIndex]}
              className="img-fluid rounded shadow w-100"
              alt={product.name}
            />
          </div>
          {/* Small Images and Product Details */}
          <div className="col-md-6">
            {/* Thumbnail Images */}
            <div className="d-flex mb-3">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  className={`img-thumbnail me-2 ${
                    selectedImageIndex === index ? "border-primary" : ""
                  }`}
                  alt={`Thumbnail ${index}`}
                  onClick={() => setSelectedImageIndex(index)}
                  style={{ width: "75px", height: "75px", cursor: "pointer" }}
                />
              ))}
            </div>
            <hr />
            {/* Product Details */}
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <div className="mb-3">
              <strong>Added On:</strong>{" "}
              {new Date(product.createdAt).toLocaleDateString("en-GB")}
            </div>
            <hr />
            <h2>Details</h2>
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <span>Price:</span>
                <span>${product.price}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Category:</span>
                <span>{product.category}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Bill Available:</span>
                <span>{product.billAavailable ? "Yes" : "No"}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Box Available:</span>
                <span>{product.boxAavailable ? "Yes" : "No"}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Accessories Available:</span>
                <span>{product.accessoriesAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Warranty Available:</span>
                <span>{product.warrantyAavailable ? "Yes" : "No"}</span>
              </div>
              {/* <div className="d-flex justify-content-between">
                <span>Purchased Year:</span>
                <span>{product.createdAt}</span>
              </div> */}
            </div>
            <hr />
            <h2>Seller Details</h2>
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <span>Name:</span>
                <span>{product.seller.name}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Email:</span>
                <span>{product.seller.email}</span>
              </div>
            </div>
          </div>
          <hr />
          {/* Bids Section */}
          <div>
            <h1>Bids</h1>
            <button
              onClick={() => setShowAddNewBid(!showAddNewBid)}
              disabled={user._id === product.seller._id}
              className="btn btn-primary mb-3"
            >
              New Bid
            </button>
            {product.bids.length > 0 ? (
              product.bids.map((bid, index) => (
                <div key={index} className="card p-3 mb-2">
                  <div className="d-flex justify-content-between">
                    <span>
                      <strong>Name:</strong> {bid.buyer.name}
                    </span>
                    <span>
                      <strong>Bid Amount:</strong> ${bid.bidAmount}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p>No bids yet.</p>
            )}
          </div>
        </div>
        {/* Add New Bid Modal */}
        {showAddNewBid && (
          <BidModel
            product={product}
            showAddNewBid={showAddNewBid}
            getData={getData}
            setShowAddNewBid={setShowAddNewBid}
          />
        )}
      </div>
    )
  );
}

export default ProductInfo;
