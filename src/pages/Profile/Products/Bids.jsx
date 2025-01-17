import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../../redux/loaderSlice";
import { GetAllBids } from "../../../apicalls/prodoucts";

function Bids({ showBids, setShowBids, selectedProduct }) {
  const [bidData, setBidData] = useState([]);

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));

      const response = await GetAllBids({ product: selectedProduct._id });

      dispatch(SetLoader(false));

      if (response.success) {
        setBidData(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      return error.message;
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      getData();
    }
  }, [selectedProduct]);

  return (
    <div
      className={`modal fade ${showBids ? "show d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Bids</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowBids(false)}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <h6>Product Name: {selectedProduct?.name}</h6>
            <hr />
            <div className="table-responsive">
              <table className="table table-bordered table-striped text-center">
                <thead className="table-dark">
                  <tr>
                    <th>Name</th>
                    <th>Bid Amount</th>

                    <th>Message</th>
                    <th>Contact Details</th>
                  </tr>
                </thead>
                <tbody>
                  {bidData.length > 0 ? (
                    bidData.map((bid, index) => (
                      <tr key={index}>
                        <td>{bid.seller.name}</td>
                        <td>{bid.bidAmount}</td>

                        <td>{bid.message}</td>
                        <td className="">
                          <div>
                            <div className="">Phone: {bid.mobile}</div>
                            <div className=""></div> Email: {bid.seller.email}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No bids found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowBids(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bids;
