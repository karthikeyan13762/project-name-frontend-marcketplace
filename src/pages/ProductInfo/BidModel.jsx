import React, { useRef } from "react";
import { SetLoader } from "../../redux/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { PlaceNewBid } from "../../apicalls/prodoucts";

function BidModel({ showAddNewBid, setShowAddNewBid, getData, product }) {
  const { user } = useSelector((state) => state.users);
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const bidData = {
      bidAmount: formData.get("bidAmount"),
      message: formData.get("message"),
      mobile: formData.get("mobile"),
      productId: product._id,
      seller: product.seller._id,
      buyer: user._id,
    };

    try {
      dispatch(SetLoader(true));
      const response = await PlaceNewBid(bidData);
      dispatch(SetLoader(false));
      if (response.success) {
        getData();
        setShowAddNewBid(false);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      return error.message;
    }
  };

  return (
    showAddNewBid && (
      <div
        className="modal d-block"
        tabIndex="-1"
        role="dialog"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Place a Bid</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setShowAddNewBid(false)}
              ></button>
            </div>
            <div className="modal-body">
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="bidAmount" className="form-label">
                    Bid Amount
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="bidAmount"
                    name="bidAmount"
                    placeholder="Enter your bid amount"
                    required
                    maxLength={5}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="message"
                    name="message"
                    placeholder="Add a message (optional)"
                    maxLength={25}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="mobile"
                    name="mobile"
                    placeholder="Enter your mobile number"
                    required
                    maxLength={10}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Submit Bid
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default BidModel;
